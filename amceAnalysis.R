library(cjoint)
library(dplyr)

setwd("C:/Users/Gabriel/Desktop/Fall '20/CS489/CS489-GigEcoProject")

df <- read.csv("survey_data/df.csv")

df <- df %>%
  rename(
    holiday = Day.off,
    supervisor = Direct.Supervisor,
    evaluation = Evaluation,
    salary = Salary,
    competitor = Working.Options..companies.in.same.sector.,
    length = Working.hours..length.,
    period = Working.hours..time.period.
  )

df$holiday <- factor(df$holiday,
                     levels=c("Paid, but following company policies", "Unpaid, but whenever you want"),
                     labels=c("Paid", "Unpaid"))

df$supervisor <- factor(df$supervisor,
                        levels=c("No", "Yes", "An algorithm"),
                        labels=c("No", "Yes", "An algorithm"))

df$evaluation <- factor(df$evaluation,
                        levels=c("Yearly", "Monthly", "Daily"))

df$salary <- factor(df$salary,
                    levels=c("Fixed US$500.00", "Fixed US$250.00 + US$6.25 per hour", "US$12.50 per hour"),
                    labels=c("Fixed", "Base + Var", "Var"))

df$competitor <- factor(df$competitor,
                        levels=c("No", "Yes"))

df$length <- factor(df$length,
                    levels=c("Minimum 8h", "Minimum 4h", "Work as much as you want/need"),
                    labels=c("Min 8h", "Min 4h", "Flexible"))

df$period <- factor(df$period,
                    levels=c("9am-5pm required", "Totally flexible"),
                    labels=c("9-5", "Flexible"))

attribute_list <- list()

attribute_list[["holiday"]] <- c("Paid", "Unpaid")
attribute_list[["supervisor"]] <- c("No", "Yes", "An algorithm")
attribute_list[["evaluation"]] <- c("Daily", "Monthly", "Yearly")
attribute_list[["salary"]] <- c("Fixed", "Base + Var", "Var")
attribute_list[["competitor"]] <- c("No", "Yes")
attribute_list[["length"]] <- c("Min 8h", "Min 4h", "Flexible")
attribute_list[["period"]] <- c("9-5", "Flexible")

constraint_list <- list()

constraint_list[[1]] <- list()
constraint_list[[1]]["period"] <- c("9-5")
constraint_list[[1]]["length"] <- c("Min 4h")

constraint_list[[2]] <- list()
constraint_list[[2]]["period"] <- c("9-5")
constraint_list[[2]]["length"] <- c("Flexible")

design <- makeDesign(type='constraints', attribute.levels=attribute_list,
                          constraints=constraint_list)

baselines <- list()
baselines$holiday <- "Paid"
baselines$supervisor <- "Yes"
baselines$evaluation <- "Yearly"
baselines$salary <- "Fixed"
baselines$competitor <- "No"
baselines$length <- "Min 8h"
baselines$period <- "9-5"

df$choice <- ifelse(df$choice == "True", 1, 0)

results <- amce(choice ~ holiday + supervisor + evaluation +
                  competitor + length + period + salary, data=df, respondent.id="pid", 
                design=design, baselines=baselines)

summary(results)
plot(results)

results <- amce(eval ~ holiday + supervisor + evaluation +
                  competitor + length + period + salary, data=df, respondent.id="pid",
                design=design, baselines=baselines)

summary(results)
plot(results)
