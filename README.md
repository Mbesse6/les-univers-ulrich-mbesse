# Les Univers d'Ulrich Mbesse

Première version statique du portfolio. Ouvrir `index.html` dans un navigateur pour la prévisualiser. Aucun outil de compilation n'est requis.

## Structure

- `index.html` : contenu et sections du portfolio
- `styles.css` : mise en page responsive et direction artistique
- `script.js` : bascule français/anglais, animations d'apparition et carrousel
- `assets/` : CV, portraits et photos de présentation radio

La navigation comprend quatre raccourcis interactifs dans le carrefour, un repère de progression, des liens de section qui suivent le défilement, des animations d'apparition et des réactions légères au survol. Les animations de défilement sont réduites si la préférence système correspondante est activée.

Les photos de l'ingénierie, de la radio, de la voix et de *Fragments* sont fournies dans `assets/` en WebP optimisé. La section « Sur scène, au micro » présente les quatre photos de radio reçues dans un carrousel automatique. Il avance toutes les 5,6 secondes et propose pause/reprise, navigation précédente/suivante et sélection directe. Il s'arrête au survol, au clavier ou lorsque l'onglet est masqué, et respecte la préférence de réduction des animations. Les cartes des épisodes affichent les vignettes YouTube et ouvrent les pages dans un nouvel onglet ; leur affichage nécessite une connexion Internet.

Les mentions « à ajouter », « à fournir » et « à confirmer » signalent les contenus provisoires. Les textes anglais constituent une base de traduction à relire avant publication.

## Compléments attendus

- Portraits professionnels, idéalement en JPG/WebP haute résolution
- Extraits audio à héberger si une écoute intégrée au site est souhaitée
- Identifiants/réseaux sociaux à afficher

Les sections radio et voix présentent uniquement les épisodes dont les descriptions YouTube créditent Ulrich. Les rôles affichés reprennent les descriptions : animateur/script ou chroniqueur pour les épisodes radio retenus ; voix d'acteur et bruitages pour les fictions sonores retenues. *Fragments* reste lié à sa playlist complète, avec les rôles communiqués : personnage principal, réalisateur et monteur du projet personnel.

Les sites [Le Guide IA](https://nomad237.com/) et [Escale Mboa](https://escalemboa.com/) figurent dans la section parcours numérique.

Le CV daté `17-11-2026` est copié dans `assets/CV_Ulrich_Mbesse.pdf` et lié au bouton de téléchargement. Les coordonnées affichées (e-mail et téléphone) proviennent de ce CV. Les boutons WhatsApp et Gmail ouvrent un message prérempli : le visiteur peut le relire et l'envoyer lui-même.

## Publication gratuite sur GitHub Pages

1. Créer un dépôt GitHub public nommé `les-univers-ulrich-mbesse`.
2. Déposer le contenu de ce dossier à la racine du dépôt (`index.html`, `styles.css`, `script.js`, puis `assets/`).
3. Dans **Settings → Pages**, choisir **Deploy from a branch**, puis la branche `main` et le dossier `/ (root)`.
4. Enregistrer et attendre la publication. Le site sera accessible à l'adresse `https://<nom-utilisateur>.github.io/les-univers-ulrich-mbesse/`.

Avant publication, remplacer les emplacements provisoires, vérifier les droits de diffusion des médias et corriger la traduction anglaise avec Ulrich. Un domaine personnalisé est facultatif et généralement payant.
