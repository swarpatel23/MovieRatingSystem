FROM tiangolo/uwsgi-nginx-flask:python3.6
COPY . /app
WORKDIR /app
RUN pip install --upgrade pip
RUN pip install -r ./requirements.txt
ENTRYPOINT ["python"]
CMD ["api.py"]