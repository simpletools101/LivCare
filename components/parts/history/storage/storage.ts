interface IHistoryData {
    query: string
    possibleDisease: string
    possibleSolution: string
    id:string;
}

/**
 * Add Data to existing Storage;
 * @param data
 */

export function addDataToExistingStorage(data: IHistoryData) {
    let existingStringData = localStorage.getItem('livcare')!
    let actualJSONObject: IHistoryData[] = JSON.parse(existingStringData)
    actualJSONObject.push(data)

    /**
     * ReKeep the data back
     */
    let reFormattedData = JSON.stringify(actualJSONObject)
    localStorage.setItem('livcare', reFormattedData)
}

/**
 * Get data from Existing Storage
 * @param data
 */

export function getDataFromExistingStorage(): IHistoryData[] {
    let existingStringData = localStorage.getItem('livcare')!
    let actualJSONObject: IHistoryData[] = JSON.parse(existingStringData)
    return actualJSONObject
}

export function intializeStorageBucket() {
    if (!localStorage.getItem('livcare')) {
        let playData: IHistoryData[] = []
        localStorage.setItem('livcare', JSON.stringify(playData))
    }
}
