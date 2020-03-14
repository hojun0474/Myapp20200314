import { Component, OnInit } from '@angular/core';
import { MyAppService } from '../my-app.service';
import { Router } from '@angular/router';
import { AllCommunityModules } from "@ag-grid-community/all-modules";

import * as XLSX from 'xlsx';
type AOA = any[][];

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent {
  /* 엑셀 데이터 */
  excelData: AOA = [];
  wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
  fileName: string = 'SheetJS.xlsx';

  /* 그리드 데이터 */
  private gridApi;
  private gridColumnApi;
  defaultColDef;
  rowSelection;
  columnDefs = [
    { field: 'gansun', headerName: '간선명', minWidth: 90 },
    { field: 'junju', headerName: '전주번호', minWidth: 90 },
    { field: 'date', headerName: '시공일' },
    { field: 'kikwan', headerName: '운용기관' },
    { field: 'name', headerName: '시공자' }
  ];
  rowData = [];

  /* 미리보기 데이터 */
  previewData = [];

  constructor(
    private myAppService: MyAppService,
    private router: Router
  ) {
    this.defaultColDef = {
      width: 150,
      headerCheckboxSelection: isFirstColumn,
      headerCheckboxSelectionFilteredOnly: true,
      checkboxSelection: isFirstColumn,
      resizable: true,
      editable: true
    };
    this.rowSelection = "multiple";
  }

  /* 엑셀 파일 조회 */
  getExcelFile(evt: any) {
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length == 0) {
      alert("선택된 파일이 없습니다. 엑셀 파일을 선택해주세요.");
      this.excelData = [];
      return 0;
    } else if (target.files.length !== 1) {
      alert("파일이 2개 이상 선택되었습니다. 하나의 엑셀 파일을 선택해주세요.");
      this.excelData = [];
      return 0;
    }
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      this.excelData = <AOA>(XLSX.utils.sheet_to_json(ws, { header: 1 }));
    };
    reader.readAsBinaryString(target.files[0]);
  }

  /* 그리드 초기화 */
  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.sizeColumnsToFit();
  }

  /* 그리드 그리기 */
  onGridDraw() {
    this.rowData = [];
    for (let i = 1; i < this.excelData.length; i++) {
      this.rowData.push({
        "gansun": this.excelData[i][0],
        "junju": this.excelData[i][1],
        "date": this.excelData[i][2],
        "kikwan": this.excelData[i][3],
        "name": this.excelData[i][4]
      })
    }
    this.gridApi.setRowData(this.rowData);
  }

  /* 프리뷰 데이터 보내기 */
  sendPreviewData() {
    this.previewData = [];
    var count = this.gridApi.getDisplayedRowCount();
    for (var i = 0; i < count; i++) {
      var rowNode = this.gridApi.getDisplayedRowAtIndex(i);
      if (rowNode.selected) {
        this.previewData.push(rowNode.data);
      }
    }
    this.myAppService.sendPreviewData(this.previewData);

    if (this.previewData.length === 0) {
      alert("선택한 항목이 없습니다. 미리보기를 원하는 항목을 선택하세요.");
      return 0;
    }
    this.router.navigateByUrl('preview');
  }

  /* 키워드 검색 */
  onQuickFilterChanged() {
    this.gridApi.setQuickFilter((<HTMLInputElement>document.getElementById("quickFilter")).value);
  }

  /* 행 추가 */
  onAddRow() {
    var newItem = {
      gansun: "",
      junju: "",
      date: "",
      kikwan: "",
      name: ""
    }
    this.gridApi.updateRowData({
      add: [newItem], addIndex: 0
    })
  }

  /* 행 삭제 */
  onRemoveSelected() {
    var selectedData = this.gridApi.getSelectedRows();
    this.gridApi.updateRowData({
      remove: selectedData
    })
  }

  /* 그리드 사이즈 자동 변경 */
  onGridSizeChanged(params) {
    var gridWidth = document.getElementById("grid-wrapper").offsetWidth;
    var columnsToShow = [];
    var columnsToHide = [];
    var totalColsWidth = 0;
    var allColumns = params.columnApi.getAllColumns();
    for (var i = 0; i < allColumns.length; i++) {
      var column = allColumns[i];
      totalColsWidth += column.getMinWidth();
      if (totalColsWidth > gridWidth) {
        columnsToHide.push(column.colId);
      } else {
        columnsToShow.push(column.colId);
      }
    }
    params.columnApi.setColumnsVisible(columnsToShow, true);
    params.columnApi.setColumnsVisible(columnsToHide, false);
    params.api.sizeColumnsToFit();
  }
}

function isFirstColumn(params) {
  var displayedColumns = params.columnApi.getAllDisplayedColumns();
  var thisIsFirstColumn = displayedColumns[0] === params.column;
  return thisIsFirstColumn;
}