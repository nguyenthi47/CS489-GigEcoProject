library(cjoint)
library(dplyr)
library(ggplot2)
library(ggsignif)

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

cols <- c("period", "length", "salary", "holiday", "supervisor", "competitor", "evaluation")

CapStr <- function(y) {
  c <- strsplit(y, " ")[[1]]
  paste(toupper(substring(c, 1,1)), substring(c, 2),
        sep="", collapse=" ")
}

colors <- c(
  "period" = "dodgerblue2",
  "length" = "orchid2",
  "salary" = "darkseagreen4",
  "holiday" = "goldenrod2",
  "supervisor" = "lightskyblue3",
  "competitor" = "royalblue3",
  "evaluation" = "sienna2"
)

ggplot(df, aes(x=eval)) +
  geom_histogram(aes(y=..density..), bins=5, fill="indianred1", color="indianred4") +
  theme_bw() +
  ylab("Density") +
  xlab("") +
  ggtitle("Rating Distribution") +
  theme(
    axis.text.x = element_text(size = 12),
    axis.text.y = element_text(size = 12),
    plot.title = element_text(size=14)
  )

plot <- function(col) {
  print(col)
  
  pairs <- split(t(combn(levels(df[[col]]), 2)), seq(nrow(t(combn(levels(df[[col]]), 2)))))
  
  tmp <- df %>% group_by(.dots=col) %>%
    summarise(
      mean = mean(eval),
      se = sd(eval)/sqrt(n())
    )
  
  pos <- c(max(tmp$mean) + 0.3)
  for (i in 1:length(tmp)) {
    pos <- c(pos, max(tmp$mean) + 0.3 + i * 0.4)
  }
  
  p <- ggplot(df, aes_string(x=col, y="eval", fill=col)) +
    geom_bar(mapping=aes_string(x=col, y="mean"), data=tmp, stat="identity", fill=colors[col]) +
    geom_errorbar(mapping=aes_string(x=col, y="mean", ymin="mean-se", ymax="mean+se"), data=tmp, width=0.2) +
    # geom_jitter(width=0.1, height=0.4, alpha=0.025) +
    theme_bw() +
    theme(
      axis.text.x = element_text(size = 12),
      axis.text.y = element_text(size = 12),
      plot.title = element_text(size=14)
    ) +
    labs(x="", y="Mean") +
    ggtitle(CapStr(col)) +
    scale_y_continuous(breaks=c(1, 2, 3, 4, 5), limits = c(0, max(tmp$mean) + 1.5)) +
    geom_signif(comparisons = pairs,
                test="wilcox.test", 
                map_signif_level = TRUE,
                step_increase = 0.08,
                vjust=0.4,
                textsize = 4,
                y = pos
    ) +
    theme(legend.position = "none",
          plot.margin = margin(0, 1, 0, 1))
  
  return(p)
}

plots <- lapply(cols, plot)
gridExtra::grid.arrange(grobs=plots, nrow=2)

# for (p in plots) {
#   print(p)
# }


for (col in cols) {
  print(col)
  print(pairwise.wilcox.test(df$eval, df[,col], p.adjust.method = "BH"))
}

df <- df %>%
  mutate(choiceV = ifelse(choice == "True", 1, 0))

df <- df %>%
  mutate(pid.rid = paste(pid, rid, sep="-"))

unique_pid <- unique(df$pid.rid)

plot2 <- function(col) {
  print(col)
  
  pairs <- split(t(combn(levels(df[[col]]), 2)), seq(nrow(t(combn(levels(df[[col]]), 2)))))
  
  to_drop <- c()
  for (pid in unique_pid) {
    tmp <- df[df$pid.rid == pid,]
    tmp_ <- tmp[[col]]
    if (tmp_[1] == tmp_[2]) {
      to_drop <- c(to_drop, pid)
    }
  }
  
  df.clean <- df[!df$pid.rid %in% to_drop, ]
  
  tmp <- df.clean[df.clean$choice == "True", ] %>% group_by(.dots=col) %>%
    summarise(perc=n())
  tmp$perc <- tmp$perc / sum(tmp$perc) * 100
  
  pos <- c(max(tmp$perc) + 5)
  for (i in 1:length(tmp)) {
    pos <- c(pos, max(tmp$perc) + 5 + i * 4)
  }
  
  p.values <- rcompanion::pairwiseNominalIndependence(
    table(df.clean[[col]], df.clean$choice),
    fisher = FALSE,
    gtest = FALSE,
    chisq = TRUE,
    method = "BH",
    digits = 3
  )$p.adj.Chisq
  
  p.values <- gtools::stars.pval(p.values)
  p.values[p.values == " "] <- "NS."
  p.values[p.values == "."] <- "NS."
  
  
  p <- ggplot(df.clean, aes_string(x=col, y="choiceV", fill=col)) +
    geom_bar(mapping=aes_string(x=col, y="perc"), data=tmp, stat="identity", fill=colors[col]) +
    theme_bw() +
    scale_y_continuous(limits = c(0, max(tmp$perc) + 15)) +
    theme(
      axis.text.x = element_text(size = 12),
      axis.text.y = element_text(size = 12)
    ) +
      labs(x="", y="% of Choices") +
      ggtitle(CapStr(col)) +
      theme(legend.position = "none",
            plot.margin = margin(0, 1, 0, 1)) +
      geom_signif(comparisons = pairs,
                  annotations = p.values,
                  vjust=0.4,
                  textsize = 4,
                  y = pos
      )
  
  return(p)
}

plots2 <- lapply(cols, plot2)
gridExtra::grid.arrange(grobs=plots2, nrow=2)

for (col in cols) {
  print(col)
  print(chisq.test(table(df$choice, df[, col])))
}

rcompanion::pairwiseNominalIndependence(
  table(df$length, df$choice),
  fisher = FALSE,
  gtest = FALSE,
  chisq = TRUE,
  method = "holm",
  digits = 3
)



