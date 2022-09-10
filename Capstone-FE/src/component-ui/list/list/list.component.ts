import { ActorService } from 'src/service/actor-service/actor.service';
import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { editActor } from 'src/component/actor-page/actor-store/actor.action';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, AfterViewInit, OnChanges {
  @Input('listData') listData:any[] = []
  @Input('listColsName') listColsName:string[] = []
  @Input('listColsTitle') listColsTitle:string[] = []
  @Input('isPaginated') isPagination:boolean = true
  @Input('rowClickEvent') rowClickEvent:any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dummyData: any[] = [];
  dataSource = new MatTableDataSource<any>(this.dummyData)
  displayedColumns:string[] = ['name', 'age', 'gender', 'dateOfBirth', 'salary', 'numberOfMovies', 'numberOfAwards']
  constructor(public router:Router, public actorService:ActorService, public store:Store) { }
  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    if (this.isPagination) {
      this.dataSource.paginator = this.paginator
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    console.log(changes)
    if (changes['listData'].previousValue?.length !== changes['listData'].currentValue?.length) {
      this.setUpListData()
    }

  }
  setUpListData() {
    // console.log(this.listData, this.listColsName, this.listColsTitle)
    this.dataSource = new MatTableDataSource<any>((this.listData.length > 0) ? this.listData : this.dummyData)
    this.displayedColumns = (this.listColsName.length > 0) ? this.listColsName : this.displayedColumns
    if (this.isPagination) {
      this.dataSource.paginator = this.paginator
    }
  }

  invokedEvent(row:any) {
    console.log('invokedEvent run')
    this.store.dispatch(editActor({actorInfo:row}))
    this.rowClickEvent && this.rowClickEvent()
  }
}
