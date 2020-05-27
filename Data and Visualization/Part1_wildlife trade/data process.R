# final version

library(sp)
library(jsonlite)
library(maptools)
library(rgdal)
library(tmap)
library(tidyverse)
library(tidyr)
library(rpivotTable)
library(igraph)
library(ggplot2)
library(plotly)
library(dplyr)
library(reshape2)
library(plyr)
library(ggalluvial)
library(wordcloud2)

# country code data(copy from googleCharts)
countrycode = countrycode::codelist%>%select(iso2c,country.name.en)

# continent code
continentcode = read.csv("https://pkgstore.datahub.io/JohnSnowLabs/country-and-continent-codes-list/country-and-continent-codes-list-csv_csv/data/b7876b7f496677669644f3d1069d3121/country-and-continent-codes-list-csv_csv.csv")
continent_sub = continentcode%>%select(Two_Letter_Country_Code,Continent_Name)

countrycode = countrycode%>%
  merge(continent_sub,
        by.x = "iso2c",
        by.y = "Two_Letter_Country_Code",)
countrycode
write.csv(countrycode,"countrycode.csv",row.names = FALSE)

# read trade data downloaded from CITES
data2012 = read.csv("commercial_2012.csv")%>% drop_na(c("Importer","Exporter"))
data2013 = read.csv("commercial_2013.csv")%>% drop_na(c("Importer","Exporter"))
data2014 = read.csv("commercial_2014.csv")%>% drop_na(c("Importer","Exporter"))
data2015 = read.csv("commercial_2015.csv")%>% drop_na(c("Importer","Exporter"))
data2016 = read.csv("commercial_2016.csv")%>% drop_na(c("Importer","Exporter"))
data2017 = read.csv("commercial_2017.csv")%>% drop_na(c("Importer","Exporter"))
data2018 = read.csv("commercial_2018.csv")%>% drop_na(c("Importer","Exporter"))
data = rbind(data2012,data2013,data2014,data2015,data2016,data2017,data2018)

# match the country ID with country name and the continents they belong to
# and extract the term of "leather" and "skin"
data_match_name = function(dataframe){
  dataframe1 = dataframe%>%
    merge(countrycode, 
          by.x = "Importer", 
          by.y = "iso2c",
          all.x = TRUE)
  names(dataframe1)[names(dataframe1) ==  "country.name.en"] <- "importerCountry"
  
  dataframe2 = dataframe1%>%
    merge(countrycode, 
          by.x = "Exporter", 
          by.y = "iso2c",
          all.x = TRUE)
  names(dataframe2)[names(dataframe2) ==  "country.name.en"] <- "exporterCountry"
  
  dataframe2 = dataframe2%>%
    merge(countrycode, 
          by.x = "Origin", 
          by.y = "iso2c",
          all.x = TRUE)
  names(dataframe2)[names(dataframe2) ==  "country.name.en"] <- "originCountry"
  
  dataframe2 = dataframe2%>% drop_na(c("importerCountry","exporterCountry"))
  dataframe3 = dataframe2[grep("^leather",dataframe2[,13]),]
  dataframe4 = dataframe2[dataframe2$Term == "skins",]
  dataframe5 = rbind(dataframe3,dataframe4)
  return(dataframe5)
}
data_extract = data_match_name(data)
data2012_extract = data2012%>%data_match_name()
data2013_extract = data2013%>%data_match_name()
data2014_extract = data2014%>%data_match_name()
data2015_extract = data2015%>%data_match_name()
data2016_extract = data2016%>%data_match_name()
data2017_extract = data2017%>%data_match_name()
data2018_extract = data2018%>%data_match_name()

# extract the importer/exporter/origin by continent ------------------------------------------
importer_continent = data_extract%>%
  dplyr::group_by(continentname.x,Year)%>%
  dplyr::count()%>%
  spread(Year,n)
names(importer_continent)[names(importer_continent) == 'continentname.x'] <- 'continent' 

exporter_continent = data_extract%>%
  dplyr::group_by(continentname.y,Year)%>%
  dplyr::count()%>%
  spread(Year,exporter_sum)
names(exporter_continent)[names(exporter_continent) == 'continentname.y'] <- 'continent' 

origin_continent = data_extract%>%
  dplyr::group_by(continentname,Year)%>%
  dplyr::count()%>%
  spread(Year,n)
names(exporter_continent)[names(exporter_continent) == 'continentname.y'] <- 'continent' 

# extract importer country --------------------------------------------------------------
data_capture_importer = function(dataframe,year,path){
  data_Importer = dataframe%>%
    dplyr::group_by(importerCountry)%>%
    dplyr::count()%>%
    select(importerCountry,n)
  names(data_Importer) = c("importer","country")
  write.csv(data_Importer,path,row.names = FALSE)
}

data_capture_importer(data2012_extract,2012,"importer_2012.csv")
data_capture_importer(data2013_extract,2013,"importer_2013.csv")
data_capture_importer(data2014_extract,2014,"importer_2014.csv")
data_capture_importer(data2015_extract,2015,"importer_2015.csv")
data_capture_importer(data2015_extract,2016,"importer_2016.csv")
data_capture_importer(data2015_extract,2017,"importer_2017.csv")
data_capture_importer(data2015_extract,2018,"importer_2018.csv")

# extract exporter country ------------------------------------------------------
data_capture_exporter = function(dataframe,year,path){
  data_exporter = dataframe%>%
    dplyr::group_by(exporterCountry)%>%
    dplyr::count()%>%
    select(exporterCountry,n)
  names(data_exporter) = c("exporter","country")
  write.csv(data_exporter,path,row.names = FALSE)
}
data_capture_exporter(data2012_extract,2012,"exporter_2012.csv")
data_capture_exporter(data2013_extract,2013,"exporter_2013.csv")
data_capture_exporter(data2014_extract,2014,"exporter_2014.csv")
data_capture_exporter(data2015_extract,2015,"exporter_2015.csv")
data_capture_exporter(data2016_extract,2016,"exporter_2016.csv")
data_capture_exporter(data2017_extract,2017,"exporter_2017.csv")
data_capture_exporter(data2018_extract,2018,"exporter_2018.csv")


# extract origin country ----------------------------------------------
data_capture_Origin = function(dataframe,year,path){
  dataframe = dataframe%>% drop_na("originCountry")
  dataframe1 = dataframe%>%
    dplyr::group_by(originCountry) %>%
    dplyr::count()%>%
    select(originCountry,n)
  dataframe1$originCountry = as.character(dataframe1$originCountry)
  names(dataframe1) = c("origin","country")
  write.csv(dataframe1,path,row.names = FALSE)
}

data_capture_Origin(data2012_extract,2012,"origin_2012.csv")
data_capture_Origin(data2013_extract,2013,"origin_2013.csv")
data_capture_Origin(data2014_extract,2014,"origin_2014.csv")
data_capture_Origin(data2015_extract,2015,"origin_2015.csv")
data_capture_Origin(data2016_extract,2016,"origin_2016.csv")
data_capture_Origin(data2017_extract,2017,"origin_2017.csv")
data_capture_Origin(data2018_extract,2018,"origin_2018.csv")

# trade relation--------------------------------------------------------------
data_relation = function(dataframe){
  dataframe1 = dataframe%>%
    dplyr::group_by(exporterCountry,importerCountry) %>%
    dplyr::count()
  names(dataframe1) = c("source","target","flow")
  return(dataframe1)
}

data2012_relation = data_relation(data2012_extract)%>% write.csv("data2012_relation.csv",row.names = FALSE)
data2013_relation = data_relation(data2013_extract)%>% write.csv("data2013_relation.csv",row.names = FALSE)
data2014_relation = data_relation(data2014_extract)%>% write.csv("data2014_relation.csv",row.names = FALSE)
data2015_relation = data_relation(data2015_extract)%>% write.csv("data2015_relation.csv",row.names = FALSE)
data2016_relation = data_relation(data2016_extract)%>% write.csv("data2016_relation.csv",row.names = FALSE)
data2017_relation = data_relation(data2017_extract)%>% write.csv("data2017_relation.csv",row.names = FALSE)
data2018_relation = data_relation(data2018_extract)%>% write.csv("data2018_relation.csv",row.names = FALSE)


# extract general term ----------------------------------------------------------
data_capture_general_term = function(dataframe){
  dataframe1 = dataframe%>%
    dplyr::group_by(Term) %>%
    dplyr::count()
  dataframe1$Term = as.character(dataframe1$Term)
  return(dataframe1)
}
data_general_term = data.frame()
data_general_term = data_capture_general_term(data2012_extract)%>%as.data.frame
names(data_general_term)[names(data_general_term ) ==  "n"] = as.character(2012)

data_merge_general_term= function(dataframe1,dataframe2){
  dataframe3 = merge(dataframe1,dataframe2,
                     by = "Term")
  return(dataframe3)
}
data_general_term

data_general_term = data_merge_general_term(data_general_term,
                                            data_capture_general_term(data2013_extract)%>%as.data.frame)
data_general_term = data_merge_general_term(data_general_term,
                                            data_capture_general_term(data2014_extract)%>%as.data.frame)
data_general_term = data_merge_general_term(data_general_term,
                                            data_capture_general_term(data2015_extract)%>%as.data.frame)
data_general_term = data_merge_general_term(data_general_term,
                                            data_capture_general_term(data2016_extract)%>%as.data.frame)
data_general_term = data_merge_general_term(data_general_term,
                                            data_capture_general_term(data2017_extract)%>%as.data.frame)
data_general_term = data_merge_general_term(data_general_term,
                                            data_capture_general_term(data2018_extract)%>%as.data.frame)
names(data_general_term) = c("Terms","2012","2013","2014","2015","2016","2017","2018")
data_general_term
write.csv(data_general_term,"term.csv",row.names = FALSE)

# extract taxon----------------------------------------------------------
data_capture_taxon = function(dataframe){
  dataframe1 = dataframe%>%
    dplyr::group_by(Taxon) %>%
    dplyr::count()
  dataframe1$Taxon = as.character(dataframe1$Taxon)
  return(dataframe1)
}
data_taxon = data.frame()
data_taxon = data_capture_taxon(data2012_extract)%>%as.data.frame

data_merge_taxon= function(dataframe1,dataframe2){
  dataframe3 = merge(dataframe1,dataframe2,
                     by = "Taxon")
  return(dataframe3)
}
data_taxon

data_taxon = data_merge_taxon(data_taxon,
                              data_capture_taxon(data2013_extract)%>%as.data.frame)
data_taxon = data_merge_taxon(data_taxon,
                              data_capture_taxon(data2014_extract)%>%as.data.frame)
data_taxon = data_merge_taxon(data_taxon,
                              data_capture_taxon(data2015_extract)%>%as.data.frame)
data_taxon = data_merge_taxon(data_taxon,
                              data_capture_taxon(data2016_extract)%>%as.data.frame)
data_taxon = data_merge_taxon(data_taxon,
                              data_capture_taxon(data2017_extract)%>%as.data.frame)
data_taxon = data_merge_taxon(data_taxon,
                              data_capture_taxon(data2018_extract)%>%as.data.frame)
names(data_taxon) = c("Terms","2012","2013","2014","2015","2016","2017","2018")
data_taxon
write.csv(data_taxon,"Taxon.csv",row.names = FALSE)

# extract Source----------------------------------------------------------
data_capture_Source = function(dataframe){
  dataframe1 = dataframe%>%
    dplyr::group_by(Source) %>%
    dplyr::count()
  dataframe1$Source = as.character(dataframe1$Source)
  return(dataframe1)
}
data_Source = data.frame()
data_Source = data_capture_Source(data2012_extract)%>%as.data.frame
data_Source

data_merge_Source= function(dataframe1,dataframe2){
  dataframe3 = merge(dataframe1,dataframe2,
                     by = "Source")
  return(dataframe3)
}
data_Source

data_Source = data_merge_Source(data_Source,
                              data_capture_Source(data2013_extract)%>%as.data.frame)
data_Source = data_merge_Source(data_Source,
                              data_capture_Source(data2014_extract)%>%as.data.frame)
data_Source = data_merge_Source(data_Source,
                              data_capture_Source(data2015_extract)%>%as.data.frame)
data_Source = data_merge_Source(data_Source,
                              data_capture_Source(data2016_extract)%>%as.data.frame)
data_Source = data_merge_Source(data_Source,
                              data_capture_Source(data2017_extract)%>%as.data.frame)
data_Source = data_merge_Source(data_Source,
                              data_capture_Source(data2018_extract)%>%as.data.frame)
names(data_Source) = c("Source","2012","2013","2014","2015","2016","2017","2018")
data_Source
write.csv(data_Source,"Source.csv",row.names = FALSE)



# for network analysis(# exporter -- term -- taxon ) ------------------------------------
data_term = function(dataframe){
  dataframe1 = dataframe%>%
    dplyr::group_by(exporterCountry,Taxon,importerCountry) %>%
    dplyr::count()
  dataframe1$Taxon = as.character(dataframe1$Taxon)
  
  return(dataframe1)
}


data2012_term_exporter = data_term(data2012_extract)%>%arrange(desc(n))
data2015_term_exporter = data_term(data2015_extract)%>%arrange(desc(n))
data2018_term_exporter = data_term(data2018_extract)%>%arrange(desc(n))

# for sankey diagram ---------------------------------------------------------------------
data_sankey = function(dataframe,year){
  dataframe1 = dataframe[which(dataframe[4]>12),]
  ggplot(dataframe1,
         aes(axis1 = exporterCountry,
             axis2 = Taxon,
             axis3 = importerCountry,
             y= n)) +
    scale_x_discrete(limits = c("exporterCountry", "Taxon","importerCountry"), expand = c(.1, .05)) +
    geom_alluvium(aes(fill=exporterCountry)) +
    geom_stratum() + geom_text(stat = "stratum", label.strata = TRUE) +
    theme_minimal()+
    ggtitle("Trade Sankey",
            as.character(year))
}
data_sankey(data2012_term_exporter,"2012")
data_sankey(data2015_term_exporter,"2015")
data_sankey(data2018_term_exporter,"2018")

# network analysis --------------------------------------------------------------------
data2012_g <- graph_from_data_frame(data_relation(data2012_extract)[which(data_relation(data2012_extract)$flow >50),], 
                                    directed=T, 
                                    vertices = NULL)
E(data2012_g)$width = edge.betweenness(data2012_g)/5

plot(data2012_g,
     arrow.size = 0.2,
     vertex.size= degree(data2012_g),
     main = "Network analysis 2012")


data2015_g <- graph_from_data_frame(data_relation(data2015_extract)[which(data_relation(data2015_extract)$flow >50),], 
                                    directed=T, 
                                    vertices = NULL)
E(data2015_g)$width = edge.betweenness(data2015_g)/5
plot(data2015_g,
     arrow.size = 0.2,
     vertex.size= degree(data2015_g),
     main = "Network analysis 2015")

data2018_g <- graph_from_data_frame(data_relation(data2018_extract)[which(data_relation(data2018_extract)$flow >50),], 
                                    directed=T, 
                                    vertices = NULL)
E(data2018_g)$width = edge.betweenness(data2018_g)/5
plot(data2018_g,
     arrow.size = 0.2,
     vertex.size= degree(data2018_g),
     main = "Network analysis 2018")

