<template>
  <div>
    <div class="mt-1">
      <div class="col-6">
        <div class="input-group">
          <textarea v-model="watchlistRequest.userComment" class="form-control" aria-label="With textarea"
                    placeholder="Sisesta kommentaar"></textarea>
        </div>
      </div>
    </div>
    <div>
      <div>
        <div class="d-inline-flex">
          <p1 class="priceLabel">Hind</p1>
          <input v-model="watchlistRequest.priceLower" type="text" class="form-control inputBoxes">
        </div>
      </div>
    </div>
    <div>
      <div>
        <div class="d-inline-flex">
          <p1 class="priceLabel">Hind</p1>
          <input v-model="watchlistRequest.priceHigher" type="text" class="form-control inputBoxes">
        </div>
      </div>
    </div>
    <div class="row">
      <div>
        <div class="submitButton mb-5">
          <button v-on:click="addToWatchlist" class="btn btn-dark" type="button">Lisa watchlisti</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'AddToWatchlist',
  props: {
    addToWatchlist: {},
    watchlistRequest: {}
  }
}
</script>