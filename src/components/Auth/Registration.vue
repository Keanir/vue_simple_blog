<template>
  <v-container fill-height>
    <v-row align="center" justify="center">
      <v-col xs="12" sm="8" md="6">
        <h2>
          Регистрация простая, без подтверждения по e-mail. Можно ввести любой
          валидный e-mail. Либо воспользоваться тестовым логином, который указан
          на странице входа.
        </h2>
        <v-card class="elevation-1">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Registration form</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form v-model="valid" ref="form" lazy-validation>
              <v-text-field
                prepend-icon="mdi-account-circle"
                name="username"
                label="Username"
                type="text"
                v-model.trim="newUser.username"
                :rules="[rules.required]"
              ></v-text-field>

              <v-text-field
                prepend-icon="mdi-account"
                name="email"
                label="Email"
                type="email"
                v-model.trim="newUser.email"
                :rules="[rules.required, rules.email]"
              ></v-text-field>

              <v-text-field
                prepend-icon="mdi-lock"
                name="password"
                label="Password"
                type="password"
                :counter="6"
                v-model.trim="newUser.password"
                :rules="[rules.required, rules.password]"
              ></v-text-field>

              <v-text-field
                prepend-icon="mdi-lock"
                name="confirm-password"
                label="Confirm Password"
                type="password"
                :counter="6"
                v-model.trim="confirmPassword"
                :rules="[rules.required, rules.confirmPassword]"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              @click="onSubmit"
              :loading="loading"
              :disabled="!valid || loading"
              >Create account!</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      newUser: {
        username: "",
        email: "",
        password: ""
      },
      confirmPassword: "",
      valid: false,
      rules: {
        required: value => !!value || "Required.",
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        },
        password: value => {
          return (
            (value && value.length >= 6) ||
            "Password must be equal or more than 6 characters"
          );
        },
        confirmPassword: value => {
          return value === this.newUser.password || "Password should match";
        }
      }
    };
  },
  computed: {
    loading() {
      return this.$store.getters.loading;
    }
  },
  methods: {
    onSubmit() {
      if (this.$refs.form.validate()) {
        const user = {
          username: this.newUser.username,
          email: this.newUser.email,
          password: this.newUser.password
        };

        this.$store
          .dispatch("registerUser", user)
          .then(() => {
            this.$router.push("/");
          })
          .catch(() => {});
      }
    }
  }
};
</script>
