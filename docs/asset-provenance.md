# Asset provenance — modern migration

The modern application promotes only historical media that is intentionally used. Original files remain in their 2022 locations and Git history.

## Home / service-category archive

| Modern path | Historical source | Historical blob SHA | Use in modern app | Status |
| --- | --- | --- | --- | --- |
| `modern/public/media/el-nucleo-logo.png` | `assets/recursos/logo.png` | `e7a7f3a485e1a3cc4a7d4538357d9ef713ff4c57` | historical brand mark in hero | promoted, unmodified |
| `modern/public/media/services/videoclips.jpg` | `assets/recursos/fotos-servicios/fotoAnimacion.jpg` | `14ec90c2ca6d4b94c4ff3367c6585f074b214377` | historical category Videoclips | promoted, unmodified |
| `modern/public/media/services/publicidad.jpg` | `assets/recursos/fotos-servicios/fotoPublicidad.jpg` | `8d3782d8c583125f0fdc44a755909038b15bf17a` | historical category Publicidad | promoted, unmodified |
| `modern/public/media/services/cortometrajes.jpg` | `assets/recursos/fotos-servicios/fotoCorto.jpg` | `fae20e8e0926e3d09d0728cc28e4d8ddd591cb03` | historical category Cortometrajes | promoted, unmodified |
| `modern/public/media/services/coberturas.jpg` | `assets/recursos/fotos-servicios/fotoEventos.jpg` | `f7f37d0a4ca5039e563d3a69c135716cd5c2341e` | historical category Coberturas | promoted, unmodified |

The Servicios slice **reuses these same four promoted service images and the same `historicalServices` dataset**. It does not create another service catalog or another set of copied files.

## Servicios / Backstage slice

| Modern path | Historical source | Historical blob SHA | Use in 2026 archive | Status |
| --- | --- | --- | --- | --- |
| `modern/public/media/backstage/backstage-01.jpg` | `assets/recursos/fotos-backstage/fotoBackstage1.jpg` | `6656c5fc8188553fe4b57b2286f5ba2bfef259b6` | Backstage contact sheet, frame 1 | promoted, unmodified |
| `modern/public/media/backstage/backstage-02.jpg` | `assets/recursos/fotos-backstage/fotoBackstage2.jpg` | `b0cd26124854276d7beb0a19c78f3351654f4b17` | Backstage contact sheet, frame 2 | promoted, unmodified |
| `modern/public/media/backstage/backstage-03.jpg` | `assets/recursos/fotos-backstage/fotoBackstage3.jpg` | `88bd3ea89ffac5a04f5636cf1882217ce3bd9376` | Backstage contact sheet, frame 3 | promoted, unmodified |
| `modern/public/media/backstage/backstage-04.jpg` | `assets/recursos/fotos-backstage/fotoBackstage4.jpg` | `bee3475d55fd1050e8ee16122dc379ac7980189d` | Backstage contact sheet, frame 4 | promoted, unmodified |

The modern paths above point to the exact existing Git blobs. No image was downloaded, recompressed, recolored or rewritten during promotion.

## Why duplicate paths exist

The historical paths are archival evidence. The `modern/public/media/` paths define the current application's asset boundary and allow the modern build to avoid depending on files outside its own application root.

Promoted media comes from the exact existing Git blobs rather than from downloaded or transformed copies. This keeps byte-level provenance reviewable while leaving the originals untouched.

## Optimization policy

The migration initially reuses original bytes. A later optimization pass may create WebP/AVIF/responsive derivatives only when visual/performance QA shows a real benefit.

If derivatives are introduced:

1. the archival original stays unchanged;
2. the source original is recorded here;
3. generation parameters/tooling are documented or scripted;
4. dimensions/aspect ratio and quality are visually reviewed;
5. the optimized output becomes generated/promoted application media, not a replacement for the archive.

## Content-status warning

Historical presence is **not current-business evidence**.

- service-category imagery records what the 2022 site presented; it does not prove that Videoclips, Publicidad, Cortometrajes or Coberturas are commercially offered in 2026;
- Backstage imagery does not prove the identity or current relationship of any person, client, production or team that may appear in a frame;
- team/client imagery outside this slice remains unpromoted until its own content review.

Media follows the same historical-vs-current truth boundary as text.
