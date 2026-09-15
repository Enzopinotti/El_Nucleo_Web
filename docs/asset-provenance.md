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

Servicios reuses these same four files and the same `historicalServices` data authority. No second service catalog or duplicate media set exists.

## Servicios / Backstage

| Modern path | Historical source | Historical blob SHA | Use in modern app | Status |
| --- | --- | --- | --- | --- |
| `modern/public/media/backstage/backstage-01.jpg` | `assets/recursos/fotos-backstage/fotoBackstage1.jpg` | `6656c5fc8188553fe4b57b2286f5ba2bfef259b6` | Backstage contact sheet, frame 1 | promoted, unmodified |
| `modern/public/media/backstage/backstage-02.jpg` | `assets/recursos/fotos-backstage/fotoBackstage2.jpg` | `b0cd26124854276d7beb0a19c78f3351654f4b17` | Backstage contact sheet, frame 2 | promoted, unmodified |
| `modern/public/media/backstage/backstage-03.jpg` | `assets/recursos/fotos-backstage/fotoBackstage3.jpg` | `88bd3ea89ffac5a04f5636cf1882217ce3bd9376` | Backstage contact sheet, frame 3 | promoted, unmodified |
| `modern/public/media/backstage/backstage-04.jpg` | `assets/recursos/fotos-backstage/fotoBackstage4.jpg` | `bee3475d55fd1050e8ee16122dc379ac7980189d` | Backstage contact sheet, frame 4 | promoted, unmodified |

## Equipo archive

The Equipo slice promotes only the two local photographs needed to preserve what `views/equipo.html` displayed in 2022.

| Modern path | Historical source | Historical blob SHA | Source label | Status |
| --- | --- | --- | --- | --- |
| `modern/public/media/team/andre-2022.jpg` | `assets/recursos/fotos-equipo/fotoAndre.jpg` | `ba4b1c118c38c6f4c61e6645cee9f1a65549cbdb` | André Wilber Coronel Vargas | promoted, unmodified |
| `modern/public/media/team/lautaro-2022.jpg` | `assets/recursos/fotos-equipo/fotoLauti.jpg` | `58bdaafc1dbc98c62db57f3f4642c1d169f2990c` | Lautaro Weimer | promoted, unmodified |

These paths point to the exact existing Git blobs. No image was downloaded, recompressed, recolored or rewritten during promotion.

### Client media deliberately not promoted

The historical Equipo page placed two references under `Clientes Habituales`:

- `Argentina Cultura`, rendered through a remote `argentina.gob.ar` hotlink;
- `Grupo del Sud`, with local source `assets/recursos/fotos-clientes/grupo del sud.png` / blob `ca2e41b64ae878ee37df3eefa1ce9b41014770b3`.

The modern slice preserves those **labels and source context as text**. It does not need either logo to preserve the historical record, so:

- the remote government image is not reintroduced as an application dependency;
- the local Grupo del Sud logo remains historical and unpromoted;
- no logo is used as present-day endorsement evidence.

## Why duplicate media paths exist

The historical paths are archival evidence. `modern/public/media/` defines the modern application's own asset boundary and prevents the build from depending on files outside its application root.

Promoted media comes from exact existing Git blobs. Originals stay untouched and reviewable.

## Optimization policy

The migration initially reuses original bytes. WebP/AVIF/responsive derivatives are added only when measured delivery cost justifies them.

If derivatives are introduced:

1. the archival original remains unchanged;
2. source path and blob stay recorded here;
3. generation parameters/tooling are scripted or documented;
4. dimensions/aspect ratio and visual quality are reviewed;
5. generated media is treated as an application derivative, never as a replacement for archival evidence.

## Content-status warning

Historical presence is **not current-business evidence**.

- service imagery records what the 2022 site presented; it does not prove current service availability;
- Backstage imagery does not prove current team, client, production or relationships;
- Equipo photographs preserve historical name/photo association only; they do not establish current membership, role or collaboration;
- client labels preserve the page's 2022 wording only; they do not establish a current contract, endorsement or relationship.

Media follows the same historical-vs-current truth boundary as text.
