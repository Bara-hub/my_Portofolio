# 📊 Rapport d'Audit de Code & Sécurité - Portfolio "Bara Mamadou Lamine NDIAYE"

Ce rapport détaille les vulnérabilités, les problèmes d'accessibilité, de SEO et de performance identifiés sur le code source du portfolio, ainsi que les recommandations de remédiation associées.

---

## 🛡️ 1. Sécurité & Fiabilité des Liens

### 🔴 Risque Moyen : Vulnérabilité de Tabnabbing (absence de `noopener noreferrer`)
* **Description** : Les liens vers les badges Credly (lignes 254, 273, 292 de `index.html`) s'ouvrent dans un nouvel onglet via `target="_blank"` mais ne contiennent pas l'attribut `rel="noopener noreferrer"`.
* **Impact** : Un attaquant contrôlant la page de destination (ou par le biais d'une redirection malveillante sur un site tiers) pourrait utiliser l'objet JavaScript `window.opener` pour rediriger la page d'origine du portfolio vers un site de phishing ou exécuter des scripts malveillants.
* **Remédiation** : Ajouter systématiquement `rel="noopener noreferrer"` sur tous les liens externes s'ouvrant dans un nouvel onglet.

### 🟡 Risque Faible : Exposition des clés publiques EmailJS
* **Description** : Les clés EmailJS (`EMAILJS_PUBLIC_KEY`...) sont exposées dans le fichier `js/script.js`.
* **Impact** : Bien que la clé publique soit destinée à être exposée côté client pour initier les envois, un utilisateur malveillant pourrait copier ces identifiants pour envoyer des e-mails indésirables en utilisant votre quota.
* **Remédiation** : Activer la vérification des domaines autorisés (Domain Verification) dans les paramètres du dashboard EmailJS pour limiter l'utilisation de ces clés à votre domaine de production uniquement.

---

## ⚡ 2. Performance & Optimisation du Code

### 🟡 Risque Faible : Erreur syntaxique bloquante
* **Description** : Un caractère parasite `²` est positionné tout au début de `index.html` (ligne 1), juste avant la déclaration `<!DOCTYPE html>`.
* **Impact** : Cela peut forcer certains navigateurs à passer en mode de rendu "Quirks Mode" au lieu du standard HTML5 moderne, impactant les performances de rendu ou la cohérence visuelle.
* **Remédiation** : Supprimer le caractère parasite `²`.

### 🟡 Risque Faible : Scripts bloquant le rendu (Render-blocking)
* **Description** : L'inclusion d'EmailJS dans `<head>` se fait de manière synchrone.
* **Impact** : Le navigateur interrompt le parsing du HTML pour télécharger et exécuter le script, ce qui retarde l'affichage initial de la page (FCP / LCP).
* **Remédiation** : Ajouter l'attribut `defer` sur la balise `<script>` correspondante.

### 🟡 Risque Faible : Consommation CPU continue du Canvas Background
* **Description** : L'animation du Canvas tourne en boucle à 60 FPS (via `requestAnimationFrame`), même lorsque la section d'accueil (Hero) n'est plus visible à l'écran ou lorsque l'onglet est en arrière-plan.
* **Impact** : Consommation inutile de la batterie et des ressources système, en particulier sur les appareils mobiles.
* **Remédiation** : Mettre en pause la boucle d'animation lorsque le Canvas n'est pas dans le viewport de l'utilisateur (en utilisant un `IntersectionObserver` sur la section d'accueil ou en écoutant l'événement `visibilitychange`).

---

## 🌐 3. Accessibilité (a11y) & Sémantique

### 🟡 Risque Faible : Emojis non descriptifs pour les lecteurs d'écran
* **Description** : Plusieurs emojis (ex : `📍`, `📧`, `📞`, `🔗`, `🐙`) sont utilisés à des fins de décoration dans la section Contact sans balisage d'accessibilité.
* **Impact** : Les lecteurs d'écran lisent la description textuelle interne de l'emoji à voix haute, ce qui nuit à l'expérience utilisateur des personnes malvoyantes.
* **Remédiation** : Envelopper les emojis dans un élément `<span role="img" aria-label="Description de l'icône">` ou les masquer via `aria-hidden="true"` s'ils sont uniquement décoratifs.

---

## 🔍 4. Référencement (SEO) & Partage Social

### 🟡 Risque Faible : Absence de balises Open Graph (graphe social)
* **Description** : Aucune métadonnée Open Graph (Facebook, LinkedIn) ou Twitter Cards n'est présente dans le `<head>`.
* **Impact** : Lors du partage du lien de votre portfolio sur LinkedIn ou WhatsApp, l'aperçu généré sera vide (pas d'image d'aperçu, pas de description structurée).
* **Remédiation** : Ajouter les balises `<meta property="og:title">`, `<meta property="og:description">`, `<meta property="og:image">`, etc.

---

## 🛠️ Plan d'action appliqué

1. **Nettoyage HTML** : Suppression du caractère parasite `²` et configuration de l'attribut `defer` sur le script d'EmailJS.
2. **Renforcement de la sécurité** : Ajout de `rel="noopener noreferrer"` sur les liens Credly externes.
3. **Optimisation d'Énergie/Performance** : Intégration d'un observateur d'intersection pour arrêter l'animation Canvas dès que l'accueil n'est plus affichée.
4. **Enrichissement SEO** : Ajout des méta-balises Open Graph dans le fichier HTML.
5. **Amélioration Accessibilité** : Formatage des icônes emojis avec les rôles ARIA adaptés.
