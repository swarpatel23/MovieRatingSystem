# -*- coding: utf-8 -*-
"""
Created on Wed Mar 18 13:58:13 2020

@author: HP WORLD
"""

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.datasets import load_files
from sklearn.model_selection import GridSearchCV
from sklearn.model_selection import train_test_split
from sklearn import svm
from sklearn import linear_model

from sklearn.metrics import confusion_matrix 
from sklearn.metrics import accuracy_score 
from sklearn.metrics import classification_report
from pickle import dump

import numpy as np
import pandas as pd
import mglearn
import matplotlib.pyplot as plt

reviews_train = load_files("train_data/",shuffle=False)
text_train, y_train = reviews_train.data, reviews_train.target

print("Number of documents in train data: {}".format(len(text_train)))
print("Samples per class (train): {}".format(np.bincount(y_train)))

text_train, text_test, y_train, y_test = train_test_split(text_train, y_train, test_size=0.33, random_state=42)

vect = TfidfVectorizer(min_df=5,max_df=0.5,ngram_range=(1, 2))
X_train = vect.fit(text_train).transform(text_train)
print(np.size(X_train,0))
print(np.size(X_train,1))

X_test = vect.transform(text_test)

print(np.size(X_test,0))
print(np.size(X_test,1))
print("Vocabulary size: {}".format(len(vect.vocabulary_)))
print("X_train:\n{}".format(repr(X_train)))
print("X_test: \n{}".format(repr(X_test)))


feature_names = vect.get_feature_names()
print("Number of features: {}".format(len(feature_names)))



clf = linear_model.SGDClassifier(max_iter=1000, tol=1e-3)



clf.fit(X_train, y_train)
sgdpredicted=clf.predict(X_test)

x = ['good movie','bad movie','backwaas movie']
x = vect.transform(x)
y = [1,0,0]
y=np.array(y)

'''
partial_fit is method for online learning. it is useful when you have huge dataset.
online learning is useful for training model on new data.
here it useful for training model on new review.
all sklearn library algo does not support online learning.
'''
clf.partial_fit(x,y)

print('Accuracy Score :',accuracy_score(y_test,sgdpredicted))

