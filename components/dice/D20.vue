<template>
    <div class="d20">
        <span>20</span>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/variables.scss";

.d20 {
    display:block;
    position: relative;
    width: 40px; 
    height: 21.5px;
    background-color: #fff;
    margin: 13px 0;

    span {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: $background-color;
        font-size: 18px;
        font-weight: bold;
    }
}

.d20:before,
.d20:after {
  content: "";
  position: absolute;
  width: 0;
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
}

.d20:before {
  bottom: 100%;
  border-bottom: 13px solid #fff;
}

.d20:after {
  top: 100%;
  width: 0;
  border-top: 13px solid #fff;
}
</style>