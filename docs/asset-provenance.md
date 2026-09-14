# Asset provenance — modern migration

The modern application promotes only historical media that is intentionally used. Original files remain in their 2022 locations and Git history.

## Home slice

| Modern path | Historical source | Historical blob SHA | Use in 2026 Home | Status |
| --- | --- | --- | --- | --- |
| `modern/public/media/el-nucleo-logo.png` | `assets/recursos/logo.png` | `e7a7f3a485e1a3cc4a7d4538357d9ef713ff4c57` | historical brand mark in hero | promoted, unmodified |
| `modern/public/media/services/videoclips.jpg` | `assets/recursos/fotos-servicios/fotoAnimacion.jpg` | `14ec90c2ca6d4b94c4ff3367c6585f074b214377` | archive category historically labeled Videoclips | promoted, unmodified |
| `modern/public/media/services/publicidad.jpg` | `assets/recursos/fotos-servicios/fotoPublicidad.jpg` | `8d3782d8c583125f0fdc44a755909038b15bf17a` | archive category Publicidad | promoted, unmodified |
| `modern/public/media/services/cortometrajes.jpg` | `assets/recursos/fotos-servicios/fotoCorto.jpg` | `fae20e8e0926e3d09d0728cc28e4d8ddd591cb03` | archive category Cortometrajes | promoted, unmodified |
| `modern/public/media/services/coberturas.jpg` | `assets/recursos/fotos-servicios/fotoEventos.jpg` | `f7f37d0a4ca5039e563d3a69c135716cd5c2341e` | archive category Coberturas | promoted, unmodified |

## Why duplicate paths exist

The historical paths are archival evidence. The `modern/public/media/` paths define the current application's asset boundary and allow the modern build to avoid depending on files outside its own application root.

The files are promoted from the exact existing Git blobs rather than downloaded, modified and re-uploaded. This means the Home slice can prove byte-for-byte provenance while leaving the originals untouched.

## Optimization policy

The first Home slice intentionally reuses the original bytes. A later optimization pass may create WebP/AVIF/responsive derivatives when visual QA shows a real performance benefit.

If derivatives are introduced:

1. the archival original stays unchanged;
2. the source original is recorded here;
3. generation parameters/tooling are documented or scripted;
4. dimensions/aspect ratio and quality are visually reviewed;
5. the optimized output becomes generated/promoted application media, not a replacement for the archive.

## Content-status warning

An image being historically present in this repository does not make every person, client, service or relationship depicted in it a current 2026 claim. Media is reviewed in the same historical-vs-current truth boundary as text.

Backstage, team and client imagery have **not** been promoted in the Home slice because they are not needed yet and require their own content/context review before reuse.
