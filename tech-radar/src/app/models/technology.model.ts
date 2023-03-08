export interface Technology{
    name: string,
    category: string,
    ring: string,
    description: string,
    descriptionClassification: string,
    published: boolean,
    changes: Array<object>,
    publishDate: Date,
    createdAt: Date,
    createdBy: string,
}