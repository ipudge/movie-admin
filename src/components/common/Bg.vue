<template>
  <div class="bg-wrapper"  >
    <div class="bg-content" ref="bgContent">
      <transition name="move" mode="out-in">
        <router-view></router-view>
      </transition>
      <div id="particles-js" class="particles-wrapper" ref="particles"></div>
      <div class="copyright">ipudge All Rights Reserved.</div>
    </div>
  </div>
</template>
<script>
  import particles from 'particles.js'
  export default {
    mounted () {
      this.$nextTick(() => {
        particlesJS("particles-js", {
          "particles": {
            "number": {
              "value": 50,
              "density": {
                "enable": true,
                "value_area": 800
              }
            },
            "color": {
              "value": "#ffffff"
            },
            "shape": {
              "type": "circle",
              "stroke": {
                "width": 0,
                "color": "#000000"
              },
              "polygon": {
                "nb_sides": 5
              },
              "image": {
                "src": "img/github.svg",
                "width": 100,
                "height": 100
              }
            },
            "opacity": {
              "value": 0.5,
              "random": false,
              "anim": {
                "enable": false,
                "speed": 1,
                "opacity_min": 0.1,
                "sync": false
              }
            },
            "size": {
              "value": 20,
              "random": true,
              "anim": {
                "enable": false,
                "speed": 40,
                "size_min": 0.1,
                "sync": false
              }
            },
            "line_linked": {
              "enable": true,
              "distance": 150,
              "color": "#ffffff",
              "opacity": 0.4,
              "width": 5
            },
            "move": {
              "enable": true,
              "speed": 6,
              "direction": "none",
              "random": false,
              "straight": false,
              "out_mode": "out",
              "bounce": false,
              "attract": {
                "enable": false,
                "rotateX": 600,
                "rotateY": 1200
              }
            }
          },
          "interactivity": {
            "detect_on": "canvas",
            "events": {
              "onhover": {
                "enable": true,
                "mode": "grab"
              },
              "onclick": {
                "enable": true,
                "mode": "push"
              },
              "resize": true
            },
            "modes": {
              "grab": {
                "distance": 140,
                "line_linked": {
                  "opacity": 1
                }
              },
              "bubble": {
                "distance": 400,
                "size": 40,
                "duration": 2,
                "opacity": 8,
                "speed": 3
              },
              "repulse": {
                "distance": 200,
                "duration": 0.4
              },
              "push": {
                "particles_nb": 4
              },
              "remove": {
                "particles_nb": 2
              }
            }
          },
          "retina_detect": true
        });
      })
    },
    beforeDestroy() {
      this.$refs.bgContent.removeChild(this.$refs.particles)
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .bg-wrapper
    position: relative
    width: 100%
    height: 100%
    display flex
    justify-content center
    align-items center
    .particles-wrapper
      position absolute
      top 0
      bottom 0
      left 0
      right 0
      background-color: #eaeef2
      z-index -1
      .particles-js-canvas-el
        position absolute
        top 0
        left 0
    .bg-content
      width 440px
      .copyright
        margin-top 19px
        font-size: 12px
        text-align: center
        color: #8b96a3
</style>
