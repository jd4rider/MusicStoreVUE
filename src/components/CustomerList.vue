<template>
  <div>
    <ol v-bind:key="customer.id" v-for="(customer, i) in customers">
      <h3>
        <li>{{ ++i }}. {{ customer.fName }} - {{ customer.lName }} - {{ customer.notes }} - {{ customer.employeeID }}</li>
      <hr>
      </h3>
    </ol>
        <b-form @submit="onSubmit" @reset="onReset" v-if="show">
            <b-form-group id="fnamelabel"
                    label="First Name"
                    label-for="fname"
                    description="Enter New Employee First Name">
        <b-form-input id="fname"
                      type="text"
                      v-model="form.fName"
                      required
                      placeholder="Enter New Employee First Name">
        </b-form-input>
      </b-form-group>
      <b-form-group id="lnamelabel"
                    label="Last Name"
                    label-for="lname">
        <b-form-input id="lname"
                      type="text"
                      v-model="form.lName"
                      required
                      placeholder="Enter New Employee Last Name">
        </b-form-input>
      </b-form-group>
      <b-form-group id="notesLabel"
                    label="Enter some notes for the Customer"
                    label-for="notes">
        <b-form-input id="notes"
                      type="text"
                      v-model="form.notes"
                      required
                      placeholder="Enter some notes">
        </b-form-input>
      </b-form-group>
      <b-form-group id="employeeIDlabel"
                    label="Employee ID"
                    label-for="employeeid">
        <b-form-input id="employeeid"
                      type="number"
                      v-model="form.employeeID"
                      required
                      placeholder="Enter Employee ID Assigned">
        </b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'albumslist',
  data () {
    return {
      form: {
        albumName: '',
        artist: '',
        notes: '',
        employeeID: null
      },
      foods: [
        { text: 'Select One', value: null },
        'Carrots', 'Beans', 'Tomatoes', 'Corn'
      ],
      customers: {},
      employees: {},
      show: true
    }
  },
  methods: {
    init () {
      axios
      .get('/api/Customers', { crossdomain: true })
      .then(response => (this.customers = response.data))
      .then(() => console.log(this.customers))
      .catch(error => console.log(error))
    },
    postCustomer () {
      axios
        .post('/api/Customers',
        JSON.stringify(this.form),
        { crossdomain: true,
          withCredentials: true,
          responseType: 'json',
          mode: 'cors',
          headers:
          {
            'Content-Type': 'application/json',
            'cache-control': 'no-cache'
          }
        })
        .then(response => console.log(response))
        .then(() => this.init())
        .then(() => this.clearForm())
        .catch(error => console.log(error))
    },
    clearForm () {
      /* Reset our form values */
      this.form.fName = ''
      this.form.lName = ''
      this.form.notes = ''
      this.form.employeeID = null
      /* Trick to reset/clear native browser form validation state */
      this.show = false
      this.$nextTick(() => { this.show = true })
    },
    onSubmit (evt) {
      evt.preventDefault()
      this.postCustomer()
    },
    onReset (evt) {
      evt.preventDefault()
      this.clearForm()
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
