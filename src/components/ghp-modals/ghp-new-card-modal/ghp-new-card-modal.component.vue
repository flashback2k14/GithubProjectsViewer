<template>
  <div class="modal-mask" @click="close" v-show="show" transition="modal">
    <div class="modal-container" @click.stop>
      <div class="modal-header">
        <div>New Card</div>
      </div>

      <div class="modal-body">
        <label class="modal-body_label">Note
          <textarea rows="5" class="modal-body_control" v-model="note"></textarea>
        </label>
      </div>

      <div class="modal-footer modal-footer_text-right">
        <button class="modal-default-button" @click="save">Save</button>
      </div>
    </div>
  </div>
</template>

<script src="./ghp-new-card-modal.component.js"></script>

<style scoped>
  .modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    transition: opacity .3s ease;
  }

  .modal-container {
    width: 350px;
    margin: 15% auto;
    background: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
  }

  .modal-header {
    margin-top: 0;
    padding: 12px;
    background: #283593;
    color: #FFFFFF;
    font-size: large;
  }

  .modal-body {
    margin: 6px 0 0 0;
    padding: 6px 12px;
  }

  .modal-body_label {
    display: block;
    margin-bottom: 1em;
    font-size: medium;
  }

  .modal-body_label > .modal-body_control {
    margin-top: 0.5em;
  }

  .modal-body_control {
    display: block;
    width: 95%;
    padding: 6px;
    line-height: 1.5;
    font-size: small;
    border: 1px solid #ddd;
  }

  .modal-footer_text-right {
    padding-right: 12px;
    padding-bottom: 12px;
    text-align: right;
  }

  .modal-default-button {
    width: 80px;
    background: #FF1744;
    color: white;
    border: 0;
    border-radius: 4px;
    cursor: pointer;
    text-transform: uppercase;
    font-size: small;
  }

  .modal-default-button:hover {
    background: #D50000;
  }

  /*
    Animation
  */
  .modal-enter, .modal-leave {
    opacity: 0;
  }

  .modal-enter .modal-container,
  .modal-leave .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }

  /* Smartphones (portrait and landscape) ----------- */
  @media only screen and (min-device-width : 320px) and (max-device-width : 480px) {
    .modal-container {
      margin: 50% auto;
    }
  }
</style>