(() => {

  class Article {
    private static counter = 0;
    private id: number;
    private state: ArticleState;

    public currentData: string | null;
    public previousData: string | null; // last published version
    public draftData: string;

    constructor() {
      this.id = ++Article.counter;
      this.state = new NewState(this);
      this.currentData = null;
      this.previousData = null;
      this.draftData = '';
    }

    public changeState(newState: ArticleState) {
      console.log(`Changing article #${this.id} state to ${newState.label}`);
      this.state = newState;
    }

    public clickArchiveButton() {
      this.state.archive();
    }

    public clickPublishButton() {
      this.state.publish();
    }

    public clickRestoreButton() {
      this.state.restore();
    }

    public edit(newData: string) {
      this.state.updateDraftData(newData);
    }

    public render() {
      this.state.renderPublicData();
    }

    public renderDraft() {
      this.state.renderDraftData();
    }


  }

  // Possible state changes:
  // New -> Draft;
  // Draft -> Published;
  // Draft, Published -> Archived;
  // Archived -> Published;
  abstract class ArticleState {
    abstract readonly label: string;
    constructor(protected article: Article) { };

    public abstract archive(): void;
    public abstract publish(): void;
    public abstract updateDraftData(newData: string): void;
    public abstract restore(): void;

    public abstract renderPublicData(): void;
    public abstract renderDraftData(): void;
  }

  class NewState extends ArticleState {
    public readonly label = '<New>';

    public archive() {
      console.warn('Cannot archive article in new state');
    };

    public publish() {
      console.warn('Cannot publish article in new state');
    }

    public restore(): void {
      console.warn('Cannot restore article version in new state');
    }

    public updateDraftData(newData: string) {
      this.article.draftData = newData;
      this.article.changeState(new DraftState(this.article));
    }

    public renderPublicData() {
      console.warn("this article isn't published");
    }

    public renderDraftData() {
      console.log(`Draft data: "${this.article.draftData}"`)
    }
  }

  class DraftState extends ArticleState {
    public readonly label = '<Draft>';

    // archived articles lose current draft data
    public archive() {
      this.article.draftData = this.article.currentData || '';
      this.article.changeState(new ArchivedState(this.article));
    };

    public publish() {
      this.article.previousData = this.article.currentData;
      this.article.currentData = this.article.draftData;
      this.article.changeState(new PublishedState(this.article));
    }

    public restore(): void {
      if (this.article.previousData === null) {
        console.warn('This article has no previous versions');
      } else {
        // draft data is lost when restoring previous version
        this.article.draftData = this.article.previousData;
        this.article.previousData = this.article.currentData;
        this.article.currentData = this.article.draftData;
        this.article.changeState(new PublishedState(this.article))
      }
    }

    public updateDraftData(newData: string) {
      this.article.draftData = newData;
    }

    public renderPublicData() {
      if (!this.article.currentData) {
        console.warn("this article isn't published");
      }
      console.log(`Public data: "${this.article.currentData}"`)
    }

    public renderDraftData() {
      console.log(`Draft data: "${this.article.draftData}"`)
    }
  }

  class PublishedState extends ArticleState {
    public readonly label = '<Published>';

    public archive() {
      this.article.changeState(new ArchivedState(this.article));
    };

    public publish() {
      console.warn('this article is already published');
    }

    public restore(): void {
      if (this.article.previousData === null) {
        console.warn('This article has no previous versions');
      } else {
        // switch previous and current data
        const tmp = this.article.currentData;
        this.article.previousData = this.article.currentData;
        this.article.currentData = tmp;
      }
    }

    public updateDraftData(newData: string) {
      this.article.draftData = newData;
      this.article.changeState(new DraftState(this.article));
    }

    public renderPublicData() {
      console.log(`Public data: "${this.article.currentData}"`)
    }

    public renderDraftData() {
      console.log(`Draft data: "${this.article.draftData}"`)
    }
  }

  class ArchivedState extends ArticleState {
    public readonly label = '<Archived>';

    public archive() {
      console.warn("this article is already archived");
    };

    public publish() {
      this.article.changeState(new PublishedState(this.article));
    }

    public restore(): void {
      if (this.article.previousData === null) {
        console.warn('This article has no previous versions');
      } else {
        // switch previous and current data
        const tmp = this.article.currentData;
        this.article.previousData = this.article.currentData;
        this.article.currentData = tmp;
        this.article.changeState(new PublishedState(this.article));
      }
    }

    public updateDraftData(newData: string) {
      console.warn("This article cannot be edited since it's archived");
    }

    public renderPublicData() {
      console.warn('This article is archived. No public data');
    }

    public renderDraftData() {
      console.warn(`This article is archived. No draft data`)
    }
  }

  const client = () => {
    const article = new Article();
    article.edit('hello');
    article.edit('hello there');
    article.renderDraft();
    article.render();
    article.clickPublishButton();
    article.renderDraft();
    article.render();
    article.edit('bye');
    article.renderDraft();
    article.render();
    article.clickPublishButton();
    article.renderDraft();
    article.render();
    article.edit('zzzz');
    article.renderDraft();
    article.render();
    article.clickArchiveButton();
    article.renderDraft();
    article.render();
    article.clickRestoreButton();
    article.renderDraft();
    article.render();
    article.clickArchiveButton();
  };

  client();
})();


