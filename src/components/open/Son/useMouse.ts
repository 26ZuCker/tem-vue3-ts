import { ref, onMounted, onUnmounted } from 'vue';

export default function useMouse() {
  const x = ref(0);
  const y = ref(0);

  const update = (e: MouseEvent) => {
    x.value = e.pageX;
    y.value = e.pageY;
  };

  onMounted(() => {
    window.addEventListener('mousemove', update);
  });

  onUnmounted(() => {
    window.addEventListener('mousemove', update);
  });

  return {
    x,
    y,
  };
}
