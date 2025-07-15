async function fetchPokemon() {
  const input = document.getElementById('pokemonInput').value.toLowerCase();
  const url = `https://pokeapi.co/api/v2/pokemon/${input}`;
  const card = document.getElementById('pokemonCard');
  const errorText = document.getElementById('error');

  card.classList.add('hidden');
  errorText.classList.add('hidden');

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error('Pokémon not found');
    const data = await res.json();

    // Set image, name, type
    document.getElementById('pokemonImage').src = data.sprites.front_default;
    document.getElementById('pokemonName').innerText = data.name.toUpperCase();
    document.getElementById('pokemonType').innerText = "Type: " + data.types.map(t => t.type.name).join(', ');

    // Display stats
    const statsList = document.getElementById('pokemonStats');
    statsList.innerHTML = "";
    data.stats.forEach(stat => {
      const li = document.createElement('li');
      li.textContent = `${stat.stat.name}: ${stat.base_stat}`;
      statsList.appendChild(li);
    });

    card.classList.remove('hidden');
  } catch (err) {
    errorText.innerText = err.message;
    errorText.classList.remove('hidden');
  }
}
