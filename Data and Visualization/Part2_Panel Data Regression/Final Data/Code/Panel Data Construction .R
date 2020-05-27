#Import the Revenue Data
revenue<-read.csv("/Users/amor/Desktop/Final Data/Data/1.Revenue of luxury goods market.csv")
names(revenue)<-c("Country","year","Revenue")


library(tidyr)
library(reshape2)

#X1
#Import indenpendent Variables Data
Income<-read.csv("/Users/amor/Desktop/Final Data/Data/2.Income Index.csv")
#Convert it to the format panel data 
Income1<-melt(Income,
           id.vars = c('Country'),
           measure.vars = c("X2012","X2013","X2014","X2015","X2016","X2017","X2018"),
           variable.name='year',
           value.name='II')
#Match and merge  
panel_data<-merge(revenue,Income1,all.x = TRUE)

#X2
urban_pop<-read.csv("/Users/amor/Desktop/Final Data/Data/3.Urban Population.csv")
urban_pop1<-melt(urban_pop,
           id.vars = c('Country'),
           measure.vars = c("X2012","X2013","X2014","X2015","X2016","X2017","X2018"),
           variable.name='year',
           value.name='UP')
panel_data<-merge(panel_data,urban_pop1,all.x = TRUE)

#X3
CPS<-read.csv("/Users/amor/Desktop/Final Data/Data/4.CPS.csv")
CPS1<-melt(CPS,
            id.vars = c('Country'),
                 measure.vars = c("X2012","X2013","X2014","X2015","X2016","X2017","X2018"),
                 variable.name='year',
                 value.name='CPS')
panel_data<-merge(panel_data,CPS1,all.x = TRUE)


#X4
Education<-read.csv("/Users/amor/Desktop/Final Data/Data/5.Education Index.csv")
Education1<-melt(Education,
           id.vars = c('Country'),
           measure.vars = c("X2012","X2013","X2014","X2015","X2016","X2017","X2018"),
           variable.name='year',
           value.name='EI')
panel_data<-merge(panel_data,Education1,all.x = TRUE)

#X5
Arrivals<-read.csv("/Users/amor/Desktop/Final Data/Data/6.International Arrivals.csv")
Arrivals1<-melt(Arrivals,
                 id.vars = c('Country'),
                 measure.vars = c("X2012","X2013","X2014","X2015","X2016","X2017","X2018"),
                 variable.name='year',
                 value.name='IA')
panel_data<-merge(panel_data,Arrivals1,all.x = TRUE)

panel_data$year <- ifelse(panel_data$year == 'X2012',2012,panel_data$year)
panel_data$year <- ifelse(panel_data$year == 2,2013,panel_data$year)
panel_data$year <- ifelse(panel_data$year == 3,2014,panel_data$year)
panel_data$year <- ifelse(panel_data$year == 4,2015,panel_data$year)
panel_data$year <- ifelse(panel_data$year == 5,2016,panel_data$year)
panel_data$year <- ifelse(panel_data$year == 6,2017,panel_data$year)
panel_data$year <- ifelse(panel_data$year == 7,2018,panel_data$year)

panel_data<-as.data.frame(lapply(panel_data,as.numeric))
write.csv(panel_data,file="/Users/amor/Desktop/Final Data/Data/Panel data.csv")











