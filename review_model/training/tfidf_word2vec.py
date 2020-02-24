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
from gensim import utils
from gensim.models.doc2vec import TaggedDocument
from gensim.models import Doc2Vec

import random

import logging
import sys

log = logging.getLogger()
log.setLevel(logging.INFO)

ch = logging.StreamHandler(sys.stdout)
ch.setLevel(logging.INFO)
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
ch.setFormatter(formatter)
log.addHandler(ch)

class TaggedLineSentence(object):
    def __init__(self, sources):
        self.sources = sources

        flipped = {}

        
        for key, value in sources.items():
            if value not in flipped:
                flipped[value] = [key]
            else:
                raise Exception('Non-unique prefix encountered')

    def __iter__(self):
        for source, prefix in self.sources.items():
            with utils.smart_open(source) as fin:
                for item_no, line in enumerate(fin):
                    yield TaggedDocument(utils.to_unicode(line).split(), [prefix + '_%s' % item_no])

    def to_array(self):
        self.sentences = []
        for source, prefix in self.sources.items():
            with utils.smart_open(source) as fin:
                for item_no, line in enumerate(fin):
                    self.sentences.append(TaggedDocument(utils.to_unicode(line).split(), [prefix + '_%s' % item_no]))
        return(self.sentences)

    def sentences_perm(self):
        shuffled = list(self.sentences)
        random.shuffle(shuffled)
        return(shuffled)


log.info('source load')
train_source = {'train_neg.txt':'TRAIN_NEG', 'train_pos.txt':'TRAIN_POS'}
test_source = {'test_neg.txt':'TEST_NEG', 'test_pos.txt':'TEST_POS'}

log.info('TaggedDocument')
train_sentences = TaggedLineSentence(train_source)
test_sentences = TaggedLineSentence(test_source)

log.info('Sentiment')
train_arrays = np.zeros((25907, 100))
train_labels = np.zeros(25907)

log.info('D2V')
#model = Doc2Vec(min_count=1, window=10, size=150, sample=1e-4, negative=5, workers=7,iter=50)
#model.build_vocab(train_sentences.to_array())

log.info('Epoch')

# log.info('EPOCH: {}'.format(epoch))
#model.train(train_sentences.sentences_perm(),total_examples=model.corpus_count,epochs=model.iter)

log.info('Model Save')
#model.save('./imdb.d2v')
model = Doc2Vec.load('./modelg.d2v')
for i in range(15666):
    prefix_train_pos = 'TRAIN_POS_' + str(i)
    #prefix_train_neg = 'TRAIN_NEG_' + str(i)
    train_arrays[i] = model.docvecs[prefix_train_pos]
    #train_arrays[7737 + i] = model.docvecs[prefix_train_neg]
    train_labels[i] = 1
    #train_labels[12500 + i] = 0

for i in range(10238):
    #prefix_train_pos = 'TRAIN_POS_' + str(i)
    prefix_train_neg = 'TRAIN_NEG_' + str(i)
    #train_arrays[i] = model.docvecs[prefix_train_pos]
    train_arrays[15666 + i] = model.docvecs[prefix_train_neg]
    #train_labels[i] = 1
    train_labels[15666 + i] = 0



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

X_train = np.concatenate((X_train,train_arrays),axis=1)

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
