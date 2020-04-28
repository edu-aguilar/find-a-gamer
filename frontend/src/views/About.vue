<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div>
      <img :src="$auth.user.picture" />
      <h2>{{ $auth.user.name }}</h2>
      <p>{{ $auth.user.email }}</p>
    </div>

    <div>
      <pre>{{ JSON.stringify($auth.user, null, 2) }}</pre>
    </div>
  </div>
</template>

<script>
export default {
  name: "About",
  async mounted() {
    console.log(await this.$auth.getJwt());
  }
};
</script>
