import pandas as pd

file_name = '../survey_data/df.csv'

df = pd.read_csv(file_name)

attrs = ['Day off', 'Direct Supervisor', 'Evaluation', 'Salary', 'Working Options (companies in same sector)', 'Working hours (length)', 'Working hours (time period)']

print('Data summary')
for attr in attrs:
    print('\n' + attr)
    print(df[df.choice == True][attr].value_counts(normalize=True))

print('\nMean evaluation')
print(df['eval'].mean())
