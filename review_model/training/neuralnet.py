# -*- coding: utf-8 -*-
"""
Created on Sat Feb 29 21:24:05 2020

@author: HP WORLD
"""

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.datasets import load_files
from sklearn.model_selection import GridSearchCV
from sklearn.model_selection import train_test_split
from sklearn import svm

from sklearn.metrics import confusion_matrix
from sklearn.metrics import accuracy_score
from sklearn.metrics import classification_report
from pickle import dump

import numpy as np
import pandas as pd
import mglearn
import matplotlib.pyplot as plt

from keras import Sequential
from keras.layers import Dense

reviews_train = load_files("train_data/", shuffle=False)
text_train, y_train = reviews_train.data, reviews_train.target

print("Number of documents in train data: {}".format(len(text_train)))
print("Samples per class (train): {}".format(np.bincount(y_train)))
''''
reviews_test = load_files("test_data/")
text_test, y_test = reviews_test.data, reviews_test.target
print(y_test)
print("Number of documents in test data: {}".format(len(text_test)))
print("Samples per class (test): {}".format(np.bincount(y_test)))
'''
text_train, text_test, y_train, y_test = train_test_split(
    text_train, y_train, test_size=0.20, random_state=42)

vect = TfidfVectorizer(min_df=3, ngram_range=(1, 2))
X_train = vect.fit(text_train).transform(text_train)
print(np.size(X_train, 0))
print(np.size(X_train, 1))

X_test = vect.transform(text_test)

print(np.size(X_test, 0))
print(np.size(X_test, 1))
print("Vocabulary size: {}".format(len(vect.vocabulary_)))
print("X_train:\n{}".format(repr(X_train)))
print("X_test: \n{}".format(repr(X_test)))


feature_names = vect.get_feature_names()


classifier = Sequential()
classifier.add(Dense(100, activation='relu',
                     kernel_initializer='random_normal', input_dim=len(feature_names)))
classifier.add(Dense(25, activation='relu',
                     kernel_initializer='random_normal'))

classifier.add(Dense(10, activation='relu',
                     kernel_initializer='random_normal'))

classifier.add(Dense(4, activation='relu', kernel_initializer='random_normal'))

classifier.add(Dense(1, activation='sigmoid',
                     kernel_initializer='random_normal'))

classifier.compile(
    optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])
classifier.fit(X_train, y_train, batch_size=10, epochs=3)

eval_model = classifier.evaluate(X_test, y_test)
print(eval_model)

predictions = classifier.predict_classes(X_test)
correct = 0
wrong = 0
for i in range(X_test.shape[0]):
    #print('%s %d (expected %d)' % (text_test[i],predictions[i], y_test[i]))
    if predictions[i] == y_test[i]:
        correct = correct + 1
    else:
        wrong = wrong + 1

print(correct)
print(wrong)
print(correct/y_test.shape[0])
