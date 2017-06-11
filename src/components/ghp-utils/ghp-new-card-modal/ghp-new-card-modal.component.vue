<template>
  <div class="modal-mask" @click="close" v-show="show" transition="modal">
    <div class="modal-container" @click.stop>
      <!-- header -->
      <div class="modal-header">
        <div>Add a new Card to the Project</div>
      </div>
      <!-- input -->
      <div class="modal-body">
        <textarea rows="4" class="modal-body_control" v-model="note" placeholder="insert note here..." required></textarea>
      </div>
      <!-- button -->
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
    background-color: rgba(0,0,0,0.4);
    transition: opacity .3s ease;
  }

  .modal-container {
    width: 350px;
    margin: 15% auto;
    background: #fff;
    border-radius: 6px;
    box-shadow: 0 4px 8px rgba(0,0,0,0.6);
    transition: all .3s ease;
  }

  .modal-header {
    margin-top: 0;
    padding: 12px;
    background: #1f2d3d;
    color: #FFFFFF;
    font-size: large;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.4);
  }

  .modal-body {
    padding: 12px;
    background: #273444;
  }

  .modal-body_control {
    display: block;
    width: 95%;
    padding: 6px;
    background: #273444;
    color: #E5E9F2;
    border: 0;
    line-height: 1.5;
    font-size: small;
    border-bottom: 1px solid #1f2d3d;
    outline: none;
  }

  .modal-body_control:hover,
  .modal-body_control:focus,
  .modal-body_control:valid {
    border-bottom: 1px solid #FF1744;
  }

  .modal-body_control::placeholder {
    color: #E5E9F2;
  }

  .modal-footer_text-right {
    padding: 0 12px 12px 6px;
    background: #273444;
    text-align: right;
    border-bottom-left-radius : 4px;
    border-bottom-right-radius : 4px;
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
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.4);
    transition: 0.3s;
    outline: none;
  }

  .modal-default-button:hover,
  .modal-default-button:focus {
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.6);
  }

  /* Animation */
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
      margin: 55% auto;
    }
  }
</style>