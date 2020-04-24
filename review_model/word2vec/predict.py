from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.datasets import load_files
from sklearn.model_selection import GridSearchCV
from sklearn.model_selection import train_test_split

from pickle import dump

import numpy as np
import pandas as pd
import mglearn
import matplotlib.pyplot as plt

reviews_train = load_files("train_data/",shuffle=False)
text_train, y_train = reviews_train.data, reviews_train.target

print("Number of documents in train data: {}".format(len(text_train)))
print("Samples per class (train): {}".format(np.bincount(y_train)))

reviews_test = load_files("test_data/")
text_test, y_test = reviews_test.data, reviews_test.target
print(y_test)
print("Number of documents in test data: {}".format(len(text_test)))
print("Samples per class (test): {}".format(np.bincount(y_test)))

#text_train, text_test, y_train, y_test = train_test_split(text_train, y_train, test_size=0.33, random_state=42)

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

param_grid = {'C': [0.001,0.01,0.1,10,100]}
grid = GridSearchCV(LogisticRegression(solver='lbfgs',max_iter=5000), param_grid, cv=2)
grid.fit(X_train, y_train)

print("Best cross-validation score: {:.2f}".format(grid.best_score_))
print("Best parameters: ", grid.best_params_)
print("Best estimator: ", grid.best_estimator_)



mglearn.tools.visualize_coefficients(grid.best_estimator_.coef_, feature_names, n_top_features=25)
plt.show()

lr = grid.best_estimator_

dump(lr, open('model.pkl', 'wb'))
dump(vect, open('scaler.pkl', 'wb'))

lr.predict(X_test)
print("Score: {:.2f}".format(lr.score(X_test, y_test)))

pos = ["worst movi"]
print("Pos prediction: {}". format(lr.predict(vect.transform(pos))))

neg = ["horrible movi"]
print("Neg prediction: {}". format(lr.predict(vect.transform(neg))))

#print("enter movie review:")
#testing = []
'''
while True:
    test_str = input()
    #testing.push(test_str)
    print("prediction: {}". format(lr.predict(vect.transform([test_str]))))
'''
