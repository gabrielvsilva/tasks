/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react'
import {
  Modal,
  View,
  Text,
  TextInput,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Alert,
} from 'react-native'
import moment from 'moment'
import commonStyles from '../commonStyles'
import DateTimePicker from '@react-native-community/datetimepicker'

export default class AddTask extends Component {
  constructor(props) {
    super(props)
    this.state = this.getInitialState()
  }

  getInitialState = () => {
    return {
      desc: '',
      date: new Date(),
      showDP: Platform.OS === 'ios' ? true : false,
    }
  }

  save = () => {
    if (!this.state.desc.trim()) {
      Alert.alert('Dados inválidos', 'Informe uma descrição para a tarefa')
      return
    }
    const data = { ...this.state }
    this.props.onSave(data)
  }

  showDatePicker = () => {
    this.setState({ showDP: true })
  }

  setDate = (e, date) => {
    date = date || this.state.date

    this.setState({
      showDP: Platform.OS === 'ios' ? true : false,
      date,
    })
  }

  render() {
    const show = this.state.showDP

    let datePicker = null
    if (Platform.OS !== 'ios') {
      datePicker = (
        <TouchableOpacity onPress={this.showDatePicker}>
          <Text style={styles.date}>
            {moment(this.state.date).format('ddd, D [de] MMMM [de] YYYY')}
          </Text>
        </TouchableOpacity>
      )
    }

    return (
      <Modal
        onRequestClose={this.props.onCancel}
        visible={this.props.isVisible}
        animationType="slide"
        transparent={true}
        onShow={() => this.setState({ ...this.getInitialState() })}>
        <TouchableWithoutFeedback onPress={this.props.onCancel}>
          <View style={styles.offset} />
        </TouchableWithoutFeedback>
        <View style={styles.container}>
          <Text style={styles.header}>Nova tarefa!</Text>
          <TextInput
            placeholder="Descrição"
            style={styles.input}
            onChangeText={desc => this.setState({ desc })}
            value={this.state.desc}
          />
          {datePicker}
          {show && (
            <DateTimePicker
              mode="date"
              value={this.state.date}
              onChange={this.setDate}
            />
          )}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
            }}>
            <TouchableOpacity onPress={this.props.onCancel}>
              <Text style={styles.button}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.save}>
              <Text style={styles.button}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableWithoutFeedback onPress={this.props.onCancel}>
          <View style={styles.offset} />
        </TouchableWithoutFeedback>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    justifyContent: 'space-between',
  },
  offset: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  button: {
    margin: 20,
    marginRight: 30,
    color: commonStyles.colors.default,
  },
  header: {
    fontFamily: commonStyles.fontFamily,
    color: commonStyles.colors.secondary,
    backgroundColor: commonStyles.colors.default,
    fontSize: 15,
    textAlign: 'center',
    padding: 15,
  },
  input: {
    fontFamily: commonStyles.fontFamily,
    width: '90%',
    height: 40,
    marginTop: 10,
    marginLeft: 10,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#e3e3e3',
    borderRadius: 6,
  },
  date: {
    fontFamily: commonStyles.fontFamily,
    fontSize: 20,
    marginLeft: 10,
    marginTop: 10,
    textAlign: 'center',
  },
})
