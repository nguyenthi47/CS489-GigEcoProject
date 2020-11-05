import json
from itertools import product

data = {}
data['combinations'] = []
rawValue = [ ['9am-5pm','Totally flexible'],
		['8h','4h','Work as much as wanted'],
		['Fixed salary','Base salary + how long you work', 'Base: 0 + variable salary'],
		['Every day', 'Every month','Every year'],
		['Paid, but following company policies', 'Unpaid, but on your own volition'],
		['Yes','No'],
		['Yes','A machine', 'No']
	  ]
combinations = list(product(*rawValue))
for c in combinations:
	# work 9h-5h but not working 8h per day
	period = c[0]
	length = c[1]
	salary = c[2]
	if period == '9am-5pm' and length != '8h':
		continue
	if period == '9am-5pm' and salary == 'Base salary + how long you work':
		continue
	data['combinations'].append({
		'Working hours (time period)' : period,
		'Working hours (length)' : length,
		'Salary' : salary,
		'Evaluation' : c[3],
		'Day off' : c[4],
		'Working Options (companies in same sector)' : c[5],
		'Direct Supervisor' : c[6]
		})

with open('totalCombinations.txt', 'w') as outfile:
    json.dump(data, outfile)