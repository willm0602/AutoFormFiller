from flask import Flask, render_template, request

app = Flask(__name__)

def test_form(template):
    if request.method == 'GET':
        return render_template(template)
    elif request.method == 'POST':
        post_data = request.args
        print(post_data)

@app.route('/')
def index():
    return render_template('index.html')


if __name__ == '__main__':
    app.run(debug=True)
