import pandas as pd
from random import random

def prepare_predicted_data():
    predicted_data_df = pd.DataFrame()

    uids = []
    for x in range(0,100):
        for y in range(0,100):
            uids.append(str(x) + "." + str(y))
    
    data = [random() for _ in range(len(uids))]

    predicted_data_df['uid'] = uids
    predicted_data_df['data1'] = data

    predicted_data_df.to_csv("predicted_data.csv", index=False)

def prepare_truth_data():
    truth_value_df = pd.DataFrame()
    uids = []
    for x in range(0,100):
        for y in range(0,100):
            uids.append(str(x) + "." + str(y))
    
    truth_value_df['uid'] = uids

    truth_labels = [random() for _ in range(len(uids))]

    truth_value_df['truth_values'] = truth_labels

    truth_value_df.to_csv("truth_value.csv", index=False)

def combine_data():
    predicted_data_df = pd.read_csv("predicted_data.csv")
    truth_value_df = pd.read_csv("truth_value.csv")

    print("size of predicted_data_df: ", predicted_data_df.shape) #10000
    print("size of truth_data: ", truth_value_df.shape) #10000

    # Check for duplicate uids in both dataframes
    print("Duplicate uids in predicted_data_df: ", predicted_data_df['uid'].duplicated().sum())
    print("Duplicate uids in truth_value_df: ", truth_value_df['uid'].duplicated().sum())

    merged_df = pd.merge(truth_value_df, predicted_data_df, on='uid')

    print(merged_df)

    print(len(merged_df['uid'].unique())) #9100

    print("size of merged_df: ", merged_df.shape)

def main():
    prepare_predicted_data()
    prepare_truth_data()
    combine_data()

if __name__ == "__main__":
    main()