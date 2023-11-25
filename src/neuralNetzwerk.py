import tensorflow as tf
import tensorflow_datasets as tfds
import math
import eel as eel
import sys as sys

eel.init('src')
@eel.expose
def generate_model (neurons, IMAGE_LOAD_SIZE, epoch_number):
  data, metadata = tfds.load('horses_or_humans', as_supervised= True, with_info = True)

  metadata

  data_training, data_testing = data['train'], data['test']
  class_names = metadata.features['label'].names

  def standardize(img, labels):
      img = tf.cast(img, tf.float32)
      img /= 255
      return img, labels

  data_training = data_training.map(standardize)

  data_training = data_training.cache()
  data_testing = data_testing.cache()

  int(neurons)
  model = tf.keras.Sequential([
      tf.keras.layers.Flatten(input_shape=(300,300,3)),
      tf.keras.layers.Dense(neurons, activation = tf.nn.relu),
      tf.keras.layers.Dense(neurons, activation = tf.nn.relu),
      tf.keras.layers.Dense(neurons, activation = tf.nn.softmax), #Capa de salida para hacer discretos los valores obtenidos
  ])

  model.compile(
      optimizer = 'adam',
      loss = tf.keras.losses.SparseCategoricalCrossentropy(),
      metrics = ['accuracy']
  )


  IMAGE_LOAD_SIZE = int(IMAGE_LOAD_SIZE)
  epoch_number = int(epoch_number)

  data_training = data_training.repeat().shuffle(1027).batch(IMAGE_LOAD_SIZE)
  data_testing = data_testing.batch(IMAGE_LOAD_SIZE)
  #Entrenar el modelo
  historic = model.fit(data_training, epochs = epoch_number, steps_per_epoch=math.ceil(1027/IMAGE_LOAD_SIZE))

  loss = historic.history['loss']
  accuracy = historic.history['accuracy']
  
 
  return loss, accuracy

eel.start('nnMetricUI.html', size=(880, 60))