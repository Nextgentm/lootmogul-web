import React from "react";
import Particles from "react-tsparticles";
const ParticlesPage = ()=> {
  return (
    <Particles
      options={{
        fullScreen: {
          enable: true,
          zIndex: -1
        },
        background: {
            color: {
              value: "transparent",
            },
          },
        particles: {
          number: {
            value: 7,
            limit: 10,
            density: {
              enable: true,
              value_area: 1000
            }
          },
          color: {
            value: "#ffffff"
          },
          shape: {
            type: "image",
            
           
            images: [{
                src: "/assets/shapes/shape1.png",
                width: 100,
                height: 100
              },
              {
                src: "/assets/shapes/shape2.png",
              width: 100,
              height: 100
            },
            {
                src: "/assets/shapes/shape3.png",
              width: 100,
              height: 100
            },{
                src: "/assets/shapes/shape4.png",
              width: 100,
              height: 100
            },
              {
                  src: "/assets/shapes/shape5.png",
                width: 100,
                height: 100
              }]
          },
          opacity: {
            value: 0.5,
            random: true,
            anim: {
              enable: true,
              speed: 1,
              opacity_min: 0.5,
              sync: false
            }
          },
          size: {
            value: 30,
            random: true,
            anim: {
              enable: true,
              speed: 1,
              size_min: 10,
              sync: false
            }
          },
          line_linked: {
            enable: false,
            distance: 100,
            color: "#ffffff",
            opacity: 1,
            width: 1
          },
          move: {
            enable: true,
            speed: 1,
            direction: "none",
            random: false,
            straight: false,
            out_mode: "out",
            bounce: false,
            attract: {
              enable: false,
              rotateX: 600,
              rotateY: 1200
            }
          }
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onHover: {
              enable: false,
              mode: "bubble",
              parallax: {
                enable: false,
                force: 60,
                smooth: 10
              }
            },
            onClick: {
              enable: true,
              mode: "push"
            },
            resize: true
          },
          modes: {
            grab: {
              distance: 400,
              lineLinked: {
                opacity: 1
              }
            },
            bubble: {
              distance: 400,
              size: 100,
              duration: 2,
              opacity: 1,
              speed: 2
            },
            repulse: {
              distance: 200
            },
            push: {
              particles_nb: 4
            },
            remove: {
              particles_nb: 2
            }
          }
        },
        backgroundMask: {
          enable: false,
          cover: {
            color: {
              value: {
                r: 0,
                g: 0,
                b: 0
              }
            }
          }
        },
        retina_detect: true,
        fps_limit: 20,
        
      }}
    />
  );
}
export default ParticlesPage;