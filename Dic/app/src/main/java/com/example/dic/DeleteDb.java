package com.example.dic;

import android.content.ContentValues;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.Button;
import android.widget.RadioButton;
import android.widget.RadioGroup;
import android.widget.TextView;

public class DeleteDb extends AppCompatActivity {
    private MyDatabaseHelper dbHelper;
    private RadioButton awa;
    private RadioButton awb;
    private RadioButton awc;
    private RadioButton awd;
    private TextView ras;
    private TextView word;
    private TextView status;
    private TextView id;
    private RadioGroup radioGp;
    private String rightAs;
    private Integer primaryId;

    private TextView reminder;
    private String  aw;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.delete_db);
        awa = findViewById(R.id.awa);
        awc = findViewById(R.id.awc);
        awb = findViewById(R.id.awb);
        awd = findViewById(R.id.awd);
        ras = findViewById(R.id.ras);
        word = findViewById(R.id.word);
        id = findViewById(R.id.id);
        status = findViewById(R.id.status);
        radioGp = findViewById(R.id.radioGp);
        reminder = findViewById(R.id.reminder);


        dbHelper = new MyDatabaseHelper(this, "BookStore.db", null, 2);
        answers();
        Button deleteButton = findViewById(R.id.delete_data);
        deleteButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                SQLiteDatabase db = dbHelper.getWritableDatabase();
                db.delete("WORD", "id >= ?", new String[]{"0"});
                answers();
            }
        });


        radioGp.setOnCheckedChangeListener(new RadioGroup.OnCheckedChangeListener() {

            @Override
            public void onCheckedChanged(RadioGroup group, int checkedId) {
                RadioButton rb = (RadioButton)findViewById(checkedId);
                reminder.setText("You Selected " + rb.getText());
                int ie = radioGp.indexOfChild(rb);

                switch (ie) {
                    case 0:
                       aw = "A";
                        break;
                    case 1:
                        aw = "B";
                        break;
                    case 2:
                        aw = "C";
                        break;
                    case 3:
                        aw = "D";
                        break;
                    default:
                }
                if(aw.equals(rightAs)){
                    reminder.setText("正确");
                    update();
                }else{
                    reminder.setText("错误");
                    pdate();
                }

            }

        });
    }
    public void update(){
        SQLiteDatabase db = dbHelper.getWritableDatabase();
        ContentValues values = new ContentValues();
        values.put("status", 1);
        String opis = primaryId.toString();
        db.update("WORD", values, "id = ?", new String[] { opis});
        answers();
    }
    public void pdate(){
        SQLiteDatabase db = dbHelper.getWritableDatabase();
        ContentValues values = new ContentValues();
        values.put("status", -1);
        String opi = primaryId.toString();
        db.update("WORD", values, "id = ?",new String[] { opi});
        answers();
    }

    public void answers(){
        dbHelper = new MyDatabaseHelper(this, "BookStore.db", null, 2);
        SQLiteDatabase db = dbHelper.getWritableDatabase();
        // 查询Book表中所有的数据
        Integer a = 0;
        Cursor cursor = db.query("WORD", null, "status <= ?", new String[]{a.toString()} , null, null,  null,"1");
        if (cursor.moveToFirst()) {
            do {
                // 遍历Cursor对象，取出数据并打印
                String textt = cursor.getString(cursor.getColumnIndex("word"));
                String awas = cursor.getString(cursor.getColumnIndex("awa"));
                String awbs = cursor.getString(cursor.getColumnIndex("awb"));
                String awcs = cursor.getString(cursor.getColumnIndex("awc"));
                String awds = cursor.getString(cursor.getColumnIndex("awd"));
                String rass = cursor.getString(cursor.getColumnIndex("ras"));
                Integer ids = cursor.getInt(cursor.getColumnIndex("id"));
                Integer sds = cursor.getInt(cursor.getColumnIndex("status"));
                word.setText(textt);
                awa.setText(awas);
                awb.setText(awbs);
                awc.setText(awcs);
                awd.setText(awds);
                ras.setText(rass);
                id.setText(ids.toString()+"__");
                status.setText(""+sds.toString());
                primaryId = ids;
            } while (cursor.moveToNext());

        }else{
            id.setText("数据库数据为空");
            radioGp.setVisibility(View.GONE);
            ras.setVisibility(View.GONE);
            word.setVisibility(View.GONE);
        }

        cursor.close();
        rightAs = ras.getText().toString();
    }




}
