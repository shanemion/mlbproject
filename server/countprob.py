import pandas as pd

# Load your dataset
data = pd.read_csv('/Users/shanemion/Downloads/pset6data/savant_data.csv')

# Filter out 'field_out' events
filtered_data = data[data['events'] != 'field_out']

# Count the occurrences of each hit type
hit_counts = filtered_data['events'].value_counts()

# Calculate probabilities
total_hits = hit_counts.sum()
hit_probabilities = hit_counts / total_hits

# Print the probabilities
print(hit_probabilities)

# events (results)
# single       0.642503
# double       0.224907
# force_out    0.108736
# triple       0.022924
# home_run     0.000929
