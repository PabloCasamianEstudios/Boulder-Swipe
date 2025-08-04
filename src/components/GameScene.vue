<template>
  <div class="game-scene">
    <h1>Game Scene</h1>
    <p>This is where the game will be played.</p>

    <div class="debug-counters">
  <p>Rechazos (⟵): {{ leftSwipes }}</p>
  <p>Aceptados (⟶): {{ rightSwipes }}</p>
</div>

    <div class="card-stack">
      <div
        v-for="(reto, index) in retos"
        :key="reto.titulo"
        class="card"
        :class="{
          'top-card': index === 0,
          'swiping-right': isSwipingRight,
          'swiping-left': isSwipingLeft
        }"
        :style="{
          backgroundColor: reto.color,
          zIndex: retos.length - index,
          transform: getCardTransform(index),
          transition: cardTransition(index),
        }"
        @mousedown="startDrag($event, index)"
        @touchstart="startDrag($event, index)"
      >
        <div class="card-icon">{{ reto.icono }}</div>
        <div class="card-title">{{ reto.titulo }}</div>
        <div class="card-desc">{{ reto.descripcion }}</div>
        <div class="card-footer">
          <span class="card-diff">{{ reto.dificultad }}</span>
          <span class="card-category">{{ reto.categoria }}</span>
          <span class="card-tries">{{ reto.intentos }}</span>
        </div>
      </div>
    </div>
    <div class="actions" v-if="retos.length > 0">
      <button class="reject" @click="swipeLeft">✖</button>
      <button class="accept" @click="swipeRight">✔</button>
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            retos: [
            {
            titulo: "Mantle sobre volumen",
            descripcion: "Presiónate sobre una presa en forma de domo. Solo pie de fricción.",
            dificultad: "2D",
            intentos: "x4",
            categoria: "Fuerza",
            color: "#e74c3c",
            icono: "🔴",
            },
            {
            titulo: "Equilibrio en slab",
            descripcion: "Sube por una losa lisa con presas pequeñas para manos.",
            dificultad: "",
            intentos: "",
            categoria: "Técnica",
            color: "#2ecc71",
            icono: "🟢",
            },
            {
            titulo: "Dino a borde alto",
            descripcion: "Salta desde una presa distante hasta un filo redondeado.",
            dificultad: "",
            intentos: "",
            categoria: "Velocidad",
            color: "#3498db",
            icono: "🔵",
            },
            ],
            leftSwipes: 0,
            rightSwipes: 0,

            isDragging: false,
            startX: 0,
            currentX: 0,
            startY: 0,
            currentY: 0,
            activeIndex: null,
            cardOffsetX: 0,
            cardOffsetY: 0,
            isSwipingRight: false,
            isSwipingLeft: false,
            threshold: 120,
            rotationMultiplier: 0.2,
            maxRotation: 25,
        };
        
    },
  mounted() {
    window.addEventListener('mousemove', this.handleDrag);
    window.addEventListener('mouseup', this.endDrag);
    window.addEventListener('touchmove', this.handleDrag, { passive: false });
    window.addEventListener('touchend', this.endDrag);
  },
  beforeDestroy() {
    window.removeEventListener('mousemove', this.handleDrag);
    window.removeEventListener('mouseup', this.endDrag);
    window.removeEventListener('touchmove', this.handleDrag);
    window.removeEventListener('touchend', this.endDrag);
  },
  methods: {
    getCardTransform(index) {
      if (index === this.activeIndex) {
        const rotation = Math.min(
          Math.max(this.cardOffsetX * this.rotationMultiplier, -this.maxRotation),
          this.maxRotation
        );
        return `translate(${this.cardOffsetX}px, ${this.cardOffsetY}px) rotate(${rotation}deg)`;
      }
      
      // Efecto de apilamiento para cartas inferiores
      const stackOffset = index * 5;  // Cambiado para que las cartas posteriores aparezcan debajo
      return `translateY(${stackOffset}px) scale(${1 - stackOffset * 0.002})`;
    },
    
    cardTransition(index) {
        if (index !== this.activeIndex) return 'transform 0.3s ease';

        const isAnimatingOut = Math.abs(this.cardOffsetX) > this.threshold;
        return isAnimatingOut ? 'transform 0.4s ease-out' : 'none';
    },
    
    startDrag(event, index) {
        if (index !== 0) return;
      
        this.isDragging = true;
        this.activeIndex = index;
        this.startX = this.getClientX(event);
        this.currentX = this.startX;
        this.startY = this.getClientY(event);
        this.currentY = this.startY;
        this.cardOffsetX = 0;
        this.cardOffsetY = 0;
        this.isSwipingRight = false;
        this.isSwipingLeft = false;
    },
    
    handleDrag(event) {
      if (!this.isDragging || this.activeIndex === null) return;
      
      event.preventDefault();
      this.currentX = this.getClientX(event);
      this.currentY = this.getClientY(event);
      this.cardOffsetX = this.currentX - this.startX;
      this.cardOffsetY = this.currentY - this.startY;
      
      this.isSwipingRight = this.cardOffsetX > 50;
      this.isSwipingLeft = this.cardOffsetX < -50;
    },
    
    endDrag() {
      if (!this.isDragging || this.activeIndex === null) return;
      
      const absOffsetX = Math.abs(this.cardOffsetX);
      
      if (absOffsetX > this.threshold) {
        this.animateCardOut();
      } else {
        this.resetCardPosition();
      }
    },
    
   animateCardOut(forcedDirection = null) {
  const direction = forcedDirection ?? (this.cardOffsetX > 0 ? 1 : -1);
  const screenWidth = window.innerWidth;

  this.cardOffsetX = direction * (screenWidth * 1.2);
  this.cardOffsetY = 0;

  setTimeout(() => {
    const swipedCard = this.retos[0];

    if (direction === 1) {
      this.handleSwipeRight(swipedCard);
    } else {
      this.handleSwipeLeft(swipedCard);
    }

    this.retos.shift();
    this.resetDragState();
  }, 400);
}

,
    
    resetCardPosition() {
      this.cardOffsetX = 0;
      this.cardOffsetY = 0;
      this.isSwipingRight = false;
      this.isSwipingLeft = false;
      
      setTimeout(() => {
        this.resetDragState();
      }, 300);
    },
    
   swipeLeft() {
  if (this.retos.length === 0) return;
  this.isSwipingLeft = true;
  this.activeIndex = 0;
  setTimeout(() => {
    this.animateCardOut(-1);
  }, 10);
},

swipeRight() {
  if (this.retos.length === 0) return;
  this.isSwipingRight = true;
  this.activeIndex = 0;
  setTimeout(() => {
    this.animateCardOut(1);
  }, 10);
},
    
    handleSwipeLeft(card) {
  this.leftSwipes++;
  console.log("✖ Rechazado:", card.titulo);
},

handleSwipeRight(card) {
  this.rightSwipes++;
  console.log("✔ Aceptado:", card.titulo);
},


    getClientX(event) {
      return event.type.startsWith('touch') 
        ? event.touches[0]?.clientX || event.changedTouches[0]?.clientX 
        : event.clientX;
    },
    
    getClientY(event) {
      return event.type.startsWith('touch') 
        ? event.touches[0]?.clientY || event.changedTouches[0]?.clientY 
        : event.clientY;
    },
    
    resetDragState() {
      this.isDragging = false;
      this.activeIndex = null;
      this.startX = 0;
      this.currentX = 0;
      this.startY = 0;
      this.currentY = 0;
      this.cardOffsetX = 0;
      this.cardOffsetY = 0;
      this.isSwipingRight = false;
      this.isSwipingLeft = false;
    }
  },
};
</script>

<style scoped lang="scss">
.game-scene {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: #f0f0f0;
  font-family: 'Arial', sans-serif;
  padding: 20px;
  box-sizing: border-box;
}

.card-stack {
  position: relative;
  width: 300px;
  height: 400px;
  max-width: 100%;
  margin: 20px auto;
  user-select: none;
  touch-action: none;
}

.card {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 15px;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: white;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  cursor: grab;
  will-change: transform;
  
  &:active {
    cursor: pointer;
  }
  
  &.top-card {
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  }
  
  &.swiping-right {
    background-color: rgba(46, 204, 113, 0.1);
  }
  
  &.swiping-left {
    background-color: rgba(231, 76, 60, 0.1);
  }
}

.card-icon {
  width: 80px;
  height: 80px;
  margin: 10px auto;
  background: white;
  border-radius: 50%;
  font-size: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.card-title {
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 10px;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}

.card-desc {
  font-size: 16px;
  margin-bottom: 20px;
  line-height: 1.4;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

.card-footer {
  display: flex;
  justify-content: space-around;
  font-size: 14px;
  font-weight: bold;
  background: rgba(255, 255, 255, 0.2);
  padding: 10px;
  border-radius: 10px;
  backdrop-filter: blur(5px);
}

.actions {
  display: flex;
  justify-content: center;
  gap: 40px;
  margin-top: 30px;
  
  button {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    border: none;
    font-size: 24px;
    cursor: pointer;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    transition: transform 0.2s, box-shadow 0.2s;
    
    &:active {
      transform: scale(0.95);
    }
  }
  
  .reject {
    background: #e74c3c;
    color: white;
    
    &:hover {
      background: #c0392b;
    }
  }
  
  .accept {
    background: #2ecc71;
    color: white;
    
    &:hover {
      background: #27ae60;
    }
  }
}


.debug-counters {
  margin-top: 20px;
  font-size: 14px;
  color: #333;
  text-align: center;
}

</style>