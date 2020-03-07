from gensim import utils
from gensim.models.doc2vec import TaggedDocument
from gensim.models import Doc2Vec
from sklearn.model_selection import GridSearchCV
from sklearn.decomposition import PCA
from matplotlib import pyplot
import random


from keras import Sequential
from keras.layers import Dense
import numpy
import pandas as pd

from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split

import logging
import sys

log = logging.getLogger()
log.setLevel(logging.INFO)

ch = logging.StreamHandler(sys.stdout)
ch.setLevel(logging.INFO)
formatter = logging.Formatter(
    '%(asctime)s - %(name)s - %(levelname)s - %(message)s')
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
                    self.sentences.append(TaggedDocument(
                        utils.to_unicode(line).split(), [prefix + '_%s' % item_no]))
        return(self.sentences)

    def sentences_perm(self):
        shuffled = list(self.sentences)
        random.shuffle(shuffled)
        return(shuffled)


log.info('source load')
train_source = {'train-neg.txt': 'TRAIN_NEG', 'train-pos.txt': 'TRAIN_POS'}
test_source = {'test-neg.txt': 'TEST_NEG', 'test-pos.txt': 'TEST_POS'}

log.info('TaggedDocument')
train_sentences = TaggedLineSentence(train_source)
test_sentences = TaggedLineSentence(test_source)


log.info('D2V')
model = Doc2Vec(min_count=4, window=5, dbow_words=1,
                vector_size=8000, workers=8, iter=5)
model.build_vocab(train_sentences.to_array())

log.info('Epoch')

#log.info('EPOCH: {}'.format(epoch))
model.train(train_sentences.sentences_perm(),
            total_examples=model.corpus_count, epochs=model.iter)

log.info('Model Save')
model.save('./imdb.d2v')
#model = Doc2Vec.load('./modelg.d2v')

log.info('Sentiment')
train_arrays = numpy.zeros((25907, 8000))
train_labels = numpy.zeros(25907)


print(model.most_similar('good'))
print(model.most_similar('bad'))
print(model.most_similar('kapoor'))

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

log.info(train_labels)

test_arrays = numpy.zeros((12828, 8000))
test_labels = numpy.zeros(12828)


for index, i in enumerate(test_sentences):
    # prefix_test_pos = 'TEST_POS_' + str(i)
    # prefix_test_neg = 'TEST_NEG_' + str(i)
    feature = model.infer_vector(i[0])
    # print(i[0])
    if index < 4679:
        test_arrays[index] = feature
        test_labels[index] = 0
    else:
        test_arrays[index] = feature
        test_labels[index] = 1

log.info('Fitting')
'''
param_grid = {'C': [0.01,0.1,0.5,1,5,10,25]}
grid = GridSearchCV(LogisticRegression(solver='lbfgs',max_iter=2000,random_state=32,verbose=1), param_grid, cv=3)
grid.fit(train_arrays, train_labels)
print("Best parameters: ", grid.best_params_)
print("Best estimator: ", grid.best_estimator_)
classifier = grid.best_estimator_
'''
'''
classifier = LogisticRegression(class_weight=None, dual=False, fit_intercept=True,
           intercept_scaling=1, penalty='l2', random_state=None, tol=0.0001,max_iter=5000)

classifier.fit(train_arrays, train_labels)
'''


#log.info(classifier.score(test_arrays, test_labels))
'''
from sklearn.cluster import AffinityPropagation

ap = AffinityPropagation()
ap.fit(train_arrays[:1000,:])
cluster_labels = ap.labels_
'''
#cluster_labels = pd.DataFrame(cluster_labels, columns=['ClusterLabel'])
#pd.concat([train_arrays[15000:,:], cluster_labels], axis=1)
'''
X = model[model.wv.vocab]
pca = PCA(n_components=2)
result = pca.fit_transform(X)
pyplot.scatter(result[:, 0], result[:, 1])
words = list(model.wv.vocab)
for i, word in enumerate(words):
	pyplot.annotate(word, xy=(result[i, 0], result[i, 1]))
pyplot.show()
'''
train_arrays, test_arrays, train_labels, test_labels = train_test_split(
    train_arrays, train_labels, test_size=0.33, random_state=42)

classifier = Sequential()
# First Hidden Layer
classifier.add(Dense(100, activation='relu',
                     kernel_initializer='random_normal', input_dim=8000))
# Second  Hidden Layer
classifier.add(Dense(25, activation='relu',
                     kernel_initializer='random_normal'))
# Output Layer
classifier.add(Dense(10, activation='relu',
                     kernel_initializer='random_normal'))

classifier.add(Dense(4, activation='relu', kernel_initializer='random_normal'))

classifier.add(Dense(1, activation='sigmoid',
                     kernel_initializer='random_normal'))

classifier.compile(optimizer='rmsprop',
                   loss='binary_crossentropy', metrics=['accuracy'])
classifier.fit(train_arrays, train_labels, batch_size=10, epochs=5, verbose=2)

eval_model = classifier.evaluate(test_arrays, test_labels)
print(eval_model)

predictions = classifier.predict_classes(test_arrays)
correct = 0
wrong = 0
for i in range(test_arrays.shape[0]):
    #print('%s %d (expected %d)' % (text_test[i],predictions[i], y_test[i]))
    if predictions[i] == test_labels[i]:
        correct = correct + 1
    else:
        wrong = wrong + 1

print(correct)
print(wrong)
