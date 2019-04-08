import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Element} from '@angular/compiler';
import {async} from 'rxjs/scheduler/async';

@Component({
  selector: 'app-input-datalist',
  templateUrl: './input-datalist.component.html',
  styleUrls: ['./input-datalist.component.css']
})
export class InputDatalistComponent implements OnInit {
  @Input() public idList = 'dt_l1';
  @Input() public item_list = [];
  @Input() public inputElement: any;
  @Input() public columnValue: string;
  @Input() public filter: {column: '', value: null};
  @Output() public OnSelectItem =  new EventEmitter<any>();
  itemSelected: any;
  datalist = [];
  isFocus = false;
  indexItem = -1;
  constructor() {
    if (this.columnValue !== '') {
      this.item_list = this.item_list.filter(dt => dt[this.filter.column] === this.filter.value);
    }
  }
  async filterData(text: string) {
    try {
      this.datalist = this.item_list.filter(
        dt => {
          let founded = false;
          // dt[this.columnValue].toLowerCase().search(text.toLowerCase()) > -1;
          let newText = text;
          // remove special characters
          newText = newText.replace(/[^a-zA-Z0-9]/g, ' ');
          for (const tx of newText.split(' ')) {
            const fData = dt[this.columnValue].replace(/[^a-zA-Z0-9]/g, ' ');
            // console.log(fData, newText.split(' '));
            const matchString = fData.toLowerCase().includes(tx.toLowerCase());
            if (matchString > 0 && tx !== '') {
              founded = true;
              break;
            }
          }
          return founded;
        });
    } catch (e) {
      this.datalist = [];
      this.indexItem = -1;
    }
    this.datalist = text !== '' ? this.datalist : [];
    if (this.datalist.length === 0) {
      this.indexItem = -1;
    }
  }
  async add_events() {

    this.inputElement.addEventListener('keyup', async ev => {
      try {
        if (ev.key === 'Enter') {
          this.isFocus = false;
          setTimeout(doThis => {this.isFocus = true; }, 150);
        }
        const data_list_element = document.getElementById('id_' + this.idList + '_data_list');
        const dle_rect = data_list_element.getBoundingClientRect();
        const a_element = data_list_element.getElementsByClassName('isSelected')[0].getBoundingClientRect();
        if (ev.key === 'ArrowDown' && this.indexItem < this.datalist.length - 1 ) {
          this.indexItem += 1;
          data_list_element.scrollTop = data_list_element.scrollTop + a_element.top - dle_rect.top;
        }
        if (ev.key === 'ArrowUp' && this.indexItem > 0) {
          this.indexItem -= 1;
          data_list_element.scrollTop = data_list_element.scrollTop + a_element.top - dle_rect.top - a_element.height;
        }
        if (ev.key === 'ArrowDown' || ev.key === 'ArrowUp') {
          this.inputElement['value'] = this.datalist[this.indexItem][this.columnValue];
          this.inputElement.selectionStart = this.datalist[this.indexItem][this.columnValue].length;
          this.inputElement.selectionEnd = this.datalist[this.indexItem][this.columnValue].length;
        }
      } catch (e) {
        // console.log(e)
        if (ev.key === 'ArrowDown' || ev.key === 'ArrowUp') {
          if (this.indexItem < 0) {
            this.indexItem = 0;
          }
        }
        return;
      }
    });
    this.inputElement.addEventListener('input', ev => {
      this.indexItem = -1;
      this.filterData(ev.target['value']);
    });
    this.inputElement.addEventListener('focus', ev => {
      this.isFocus = true;
    });
    this.inputElement.addEventListener('blur', ev => {
      // we need a delay to make this event, because the click element is a blur
      setTimeout(doThis => {this.isFocus = false; }, 200);
    });
  }
  ngOnInit() {
    this.add_events();
  }

}
