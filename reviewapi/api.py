from flask import Flask, request, jsonify
from pickle import load
import traceback
import pandas as pd
import numpy as np
import json
import os
# Your API definition
app = Flask(__name__)
port = int(os.environ.get("PORT", 5000))


@app.route('/model/predict', methods=['POST'])
def predict():
    if lr:
        try:

            json_ = request.json
            print(json_["review"].lower())

            # return "done"
            return json.dumps({'predict': str(lr.predict(vect.transform([json_["review"]])))[1:-1]})

        except:

            return jsonify({'trace': traceback.format_exc()})
    else:
        print('Train the model first')
        return ('No model here to use')


if __name__ == '__main__':
    lr = load(open('model.pkl', 'rb'))
    vect = load(open('scaler.pkl', 'rb'))

    app.run(host='0.0.0.0', port=port, debug=True)
