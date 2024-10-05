type Feature = {
  id: number;
  name: string;
};

type FeatureDetails = {
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  changes: Array<{ type: string; message: string }>;
};

type UpdatedDoc =
  | {
      name: string;
      description: string;
      createdAt: string;
      updatedAt: string;
      changes: Array<{ type: string; message: string }>;
    }
  | { error: string };

class DocumentationUpdater {
  private features: Feature[];
  private updatedDocs: UpdatedDoc[] = [];

  constructor(features: Feature[]) {
    this.features = features;
  }

  private async fetchFeatureDetails(feature: Feature): Promise<FeatureDetails> {
    const response = await fetch(
      `https://api.example.com/features/${feature.id}`
    );
    return await response.json();
  }

  public async updateDocumentation(): Promise<void> {
    for (const feature of this.features) {
      try {
        const details = await this.fetchFeatureDetails(feature);
        const updatedDoc = this.formatDocumentation(details);
        this.updatedDocs.push(updatedDoc);
      } catch (error) {
        console.error(`Error fetching details for ${feature.name}: ${error}`);
        this.updatedDocs.push({ error: `Failed to update ${feature.name}` });
      }
    }
    this.saveUpdatedDocs();
  }

  private formatDocumentation(details: FeatureDetails): UpdatedDoc {
    return {
      name: details.name,
      description: details.description,
      createdAt: new Date(details.createdAt).toISOString(),
      updatedAt: new Date(details.updatedAt).toISOString(),
      changes: details.changes.map((change) => {
        return {
          type: change.type,
          message: change.message,
        };
      }),
    };
  }

  private saveUpdatedDocs(): void {
    const fs = require("fs");
    fs.writeFile(
      "updatedDocumentation.json",
      JSON.stringify(this.updatedDocs, null, 2),
      (err) => {
        if (err) throw new Error("Failed to save updated documentation.");
      }
    );
  }
}

const featuresToUpdate: Feature[] = [
  { id: 1, name: "Feature A" },
  { id: 2, name: "Feature B" },
  { id: 3, name: "Feature C" },
];

const updater = new DocumentationUpdater(featuresToUpdate);
updater.updateDocumentation();
