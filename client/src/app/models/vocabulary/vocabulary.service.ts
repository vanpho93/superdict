import { Injectable } from '@angular/core'
import { FetchService } from '../../services'
import { Observable } from 'rxjs'
import { IVocabulary } from './vocabulary.metadata'

interface IVocabularyQuery {
  fromDate?: Date
  toDate?: Date
  currentPage?: number
  pageSize?: number
  vocabularyIds?: number[]
}

@Injectable({
  providedIn: 'root'
})

export class VocabularyService {

  constructor(private fetch: FetchService) { }

  fetchVocabularies(vocabularyQuery: IVocabularyQuery): Observable<{ vocabularies: IVocabulary[], total: number }> {
    const { fromDate, toDate, pageSize, currentPage, vocabularyIds } = vocabularyQuery
    return this.fetch.get('/vocabulary', {
      fromDate: new Date(fromDate).getTime(),
      toDate: new Date(toDate).getTime(),
      pageSize,
      page: currentPage,
      vocabularyIds,
    })
  }
}
