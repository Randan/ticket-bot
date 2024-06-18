const formatTime = (delta: number): string => {
  const hours = Math.floor(delta / 1000 / 60 / 60);
  const minutes = Math.floor((delta / 1000 / 60) % 60);

  return `${hours} годин ${minutes} хвилин`;
};

export default formatTime;
