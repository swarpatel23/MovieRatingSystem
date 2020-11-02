from flask import Flask, request, jsonify
from pickle import load
import traceback
<<<<<<< HEAD
import pandas as pd
import numpy as np
import json
=======
>>>>>>> bd3de1619ef4d76419dbb2000e20e1a371c4635c

# Your API definition
app = Flask(__name__)


@app.route('/model/predict', methods=['POST'])
def predict():
    if lr:
        try:

            json_ = request.json
            print(json_["review"].lower())

            # return "done"
<<<<<<< HEAD
            return json.dumps({'predict': str(lr.predict(vect.transform([json_["review"]])))[1:-1]})
=======
            return str(lr.predict(vect.transform([json_["review"]])))
>>>>>>> bd3de1619ef4d76419dbb2000e20e1a371c4635c

        except:

            return jsonify({'trace': traceback.format_exc()})
    else:
        print('Train the model first')
        return ('No model here to use')


if __name__ == '__main__':
    try:
        port = int(sys.argv[1])
    except:
        port = 12345

    lr = load(open('model.pkl', 'rb'))
    vect = load(open('scaler.pkl', 'rb'))

    app.run(port=port, debug=True)
