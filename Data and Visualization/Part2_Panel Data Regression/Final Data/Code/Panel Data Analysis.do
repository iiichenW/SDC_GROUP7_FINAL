//Site the panel data
xtset country year,yearly

xtsum revenue
xtsum ii
xtsum up
xtsum cps
xtsum ei
xtsum ia

//Step1:Correlation and Multiplecollinear Test
//correlation Test
  
pwcorr   lnii lnup lncps lnei lnia , sig

//Multiplecollinear Test
ssc install collin 
collin   lnii lnup lncps lnei lnia 


//Step 2.1: the root unit test

//Method 1: LCC
//H0: the root unit exists
// H1: the root unit does not exist

levinlin lnrevenue, lags(1)
levinlin lnii, lags(1)
levinlin lnup, lags(1)
levinlin lncps, lags(1)
levinlin lnei, lags(1)
levinlin lnia, lags(1)


//Method 2: ADF
xtunitroot fisher lnrevenue,dfuller lags(1) 
xtunitroot fisher lnii,dfuller lags(1) 
xtunitroot fisher lnup,dfuller lags(1)
xtunitroot fisher lncps,dfuller lags(1)
xtunitroot fisher lnei,dfuller lags(1) 
xtunitroot fisher lnia,dfuller lags(1)
//all p value =0.000 < 0.05,we can reject the H0, the root unit does not exist
//the panel data is stationary 


//Step 2.2:Cointegration Test(not nessessary but we still try ）
xtcointtest kao lnrevenue lnii  lnup lncps lnei lnia
xtcointtest pedroni lnrevenue lnii  lnup lncps lnei lnia
//all p value =0.000 < 0.05,we can reject the H0,it is stationary


//Step 3.1: Build Models
//Pooled Regression Model 
reg  lnrevenue lnii  lnup lncps lnei lnia,vce(cluster country)
//Fixed Effects Model 
xtreg lnrevenue lnii  lnup lncps lnei lnia  ,fe
//Random Effects Model 
xtreg lnrevenue lnii  lnup lncps lnei lnia   ,re


//Step 3.2:Serial correlation and heteroscedasticity test

//Serial correlation 
//H0：serial correlation is not exists
//For fe model 
findit xtserial
xtserial lnrevenue lnii  lnup lncps lnei lnia 
//for re model
xtreg lnrevenue lnii  lnup lncps lnei lnia ,re
xttest1
// p value=0.0000 reject H0, the serial correlation is exists

//Heteroskedasticity
//H0:Heteroskedasticity is not exist
xtreg lnrevenue lnii  lnup lncps lnei lnia,fe
xttest3
//Prob>chi2 = 0.0000，cannot reject HO,the Heteroskedasticity is exist

//Cross-sectional dependence testing
//H0: the Cross-sectional independence
//for fe model
findit xtcsd
qui xtreg  lnii  lnup lncps lnei lnia,fe 
xtcsd,pesaran
//for re model
qui xtreg  lnii  lnup lncps lnei lnia,re
xtcsd,pesaran
// Pr = 0.0000,reject H0,cross-sectional dependence

//Step 3.3: The Modified Hausman Test 
//Due to the  exsit of Serial correlation ,Heteroskedasticity and  Cross-sectional dependence testing
//we cannot use the classical Hausman Test 
//H0:Random Effects Model is better 
xtreg lnrevenue lnii  lnup lncps lnei lnia  ,fe
est store fe_result
xtreg lnrevenue lnii  lnup lncps lnei lnia   ,re
est store re_result
hausman fe_result re_result,sigmamore
hausman fe_result re_result,sigmaless
//p =0.000<0.05 reject the H0, Fixed effect model is better 

//Step4: the Fixed Model with robust standard error
xtscc lnrevenue lnii  lnup lncps lnei lnia  ,fe


//Referece: Stata Panel Data regression https://zhuanlan.zhihu.com/p/50554575


