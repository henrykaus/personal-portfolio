/**
 * Contains state variables used by the portfolio to track:
 *   - Openness of mobile nav;
 *   - flipped state of capstone card;
 *   - and which article on page is in view.
 */
export default class State {
  constructor() {
    this.navIsOpen = false; // Mobile nav is closed when page opens
    this.capstoneIsFlipped = false; // Capstone card is front-facing when page opens
    this.activeArticleId = ''; // Currently active article ID
  }
}
