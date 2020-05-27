devtools::install_github('christophergandrud/networkD3')

library(igraph)
library(networkD3)
library(randomNames)
library(magrittr)

networkD3::saveNetwork(D3_network_2015 , "D3_2015.html", selfcontained = TRUE)

igraph_to_D3 = function(graph){
  members = membership(cluster_walktrap(graph))
  test = igraph_to_networkD3(graph,group = members)
  
  links = test$links
  nodes = test$nodes
  nodes$degree = degree(graph)**2.2
  D3_network = forceNetwork(Links = links, 
               Nodes = nodes,
               Source = 'source', 
               Target = 'target', 
               NodeID = 'name',
               Group = 'group',
               Nodesize = "degree",
               opacity = 0.8,
               fontSize = 20,
               #linkDistance = 175,
               zoom = TRUE)
  #networkD3::saveNetwork(D3_network , name, selfcontained = TRUE)
}

igraph_to_D3(data2012_g,"D3_2015.html")
igraph_to_D3(data2015_g,"D3_2015.html")
igraph_to_D3(data2018_g,"D3_2018.html")

