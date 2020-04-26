from flask import Flask, request, jsonify
from pickle import load
import traceback

# Your API definition
app = Flask(__name__)


@app.route('/model/predict', methods=['POST'])
def predict():
    if lr:
        try:

            json_ = request.json
            print(json_["review"].lower())

            # return "done"
            return str(lr.predict(vect.transform([json_["review"]])))

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
