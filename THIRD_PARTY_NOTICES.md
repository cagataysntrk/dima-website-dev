# Third-Party Notices — Hero Brain Comparison

This temporary comparison surface evaluates several open-source 3D brain and particle
visualization approaches. The final production hero should keep only the selected approach
and vendor its asset/license files locally.

## Brain Project
- Source: https://github.com/itayinbarr/brainproject
- Viewer code: Apache License 2.0, copyright Itay Inbar.
- Brain model: CC BY-SA 4.0, derived from Z-Anatomy / BodyParts3D (DBCLS), with additional
  atlas-derived structures described by the source project.
- Used in the temporary Atlas / Neon / Wireframe comparisons through the source project's
  CDN-hosted GLB and Draco decoder.

## Brain Anatomy Game
- Source: https://github.com/Rickaym/brain-game
- Application code: MIT License, copyright Pyae Sone Myo.
- Brain model: CC BY-SA 2.1 Japan, derived from BodyParts3D / DBCLS.
- Used in the temporary Perfusion / Neural Flow comparisons through the source project's GLB.

## Neuronaut
- Source: https://github.com/jamiekim22/Neuronaut
- Code: MIT License, copyright Jamie Kim.
- The temporary comparison adapts its cyan/magenta multi-light and region-pulse presentation.
  It does not redistribute Neuronaut's model asset.

## NeuroSphere / brain-threejs
- Source: https://github.com/digin1/brain-threejs
- Code: MIT License, copyright Digin Dominic.
- The temporary comparison adapts its wireframe + bloom presentation.
  Human mesh data in that repository is separately licensed CC BY-SA 3.0; Dima does not
  redistribute those meshes in this comparison.

## r3f-flow-field-particles
- Source: https://github.com/sebastien-lempens/r3f-flow-field-particles
- Code: MIT License, copyright Benjamin Miles.
- The temporary Neural Flow comparison adapts the particle-flow visual language to the
  Brain Anatomy Game model using Dima's existing Three.js stack.

No third-party trademarks or screenshots are used as Dima product identity.
