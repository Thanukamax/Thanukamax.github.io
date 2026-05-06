# remotion_v5

33-second multi-biome trailer rebuild.

## What changed
- Extended to `33s` (`990` frames @ `30fps`)
- New intro with `Loading User Data, Commencing Analysis`
- New cyber-tech analysis scene with heartbeat/NCS-like ring
- Ocean systems section preserved as the first major biome
- Unity / UE5 moved into a unique brown mountain biome with heavy dust
- Reverse engineering moved into a unique ice biome with much heavier snow
- RDNA remains volcanic
- CUDA remains forested with a lot more leaves
- Built Like a World moved into a fusion biome with blue/green/red tech energy
- Final name card extended by ~3 seconds
- Increased atmosphere density across all biomes

## Required audio
Place your chosen track here:

`public/music.mp3`

The composition expects `staticFile('music.mp3')`.

## Render
If these files live in `src/`:

```bash
npx remotion render src/index.ts Trailer out/trailer-v5.mp4 --codec=h264
```

If they live in the project root:

```bash
npx remotion render index.ts Trailer out/trailer-v5.mp4 --codec=h264
```
