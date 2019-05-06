package com.example.dic;

import android.content.Intent;
import android.content.res.ColorStateList;
import android.graphics.Color;
import android.graphics.drawable.StateListDrawable;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.RadioButton;
import android.widget.RadioGroup;
import android.widget.TextView;
import android.widget.Toast;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class MainActivity extends AppCompatActivity {

    private  RadioGroup rdgp;
    private  TextView tips;
    private  String url ="https://shop.miido.com.cn/schoolDetaile/getAllSchoolInfo.action";
    private  JSONArray row;
    private  TextView word;
    private  String msg;



    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        tips =   findViewById(R.id.tips);
        word = findViewById(R.id.word);
        rdgp =  findViewById(R.id.radioGp);
        voll();
    }


    public void voll(){
        RequestQueue queue = Volley.newRequestQueue(this);
        StringRequest stringRequest = new StringRequest(Request.Method.GET, url,
                new Response.Listener<String>() {
                    @Override
                    public void onResponse(String response) {
                        try{
                            JSONObject uobj = new JSONObject(response);
                            row = uobj.getJSONArray("datainfo");
                             msg = uobj.getString("message");
                            word.setText(msg);
                            addV();

                            Toast.makeText(MainActivity.this,"okay",Toast.LENGTH_SHORT).show();

                        }catch(final JSONException e){
                            Toast.makeText(MainActivity.this,"error",Toast.LENGTH_SHORT).show();
                        }
                    }
                }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                Toast.makeText(MainActivity.this, "error occured", Toast.LENGTH_SHORT).show();
            }
        });
        // Add the request to the RequestQueue.
        queue.add(stringRequest);
    }

    //动态添加视图
    public void addV(){
        String title[] = new String[row.length()];
        for(int i = 0; i < row.length(); i++ ){
            try{
                JSONObject jsobj = row.getJSONObject(i);
                title[i] = jsobj.getString("schoolname");

                RadioButton btn = new RadioButton(this);
                btn.setPadding(30,38,20,38);
                btn.setButtonDrawable(new StateListDrawable());
                btn.setText( title[i]);
                RadioGroup.LayoutParams layoutP= new RadioGroup.LayoutParams(
                        RadioGroup.LayoutParams.MATCH_PARENT, RadioGroup.LayoutParams.MATCH_PARENT);
                btn.setLayoutParams(layoutP);
                btn.setBackgroundResource(R.drawable.radiobutton_background);
                int colorInt = getResources().getColor(R.color.black);
                ColorStateList csl = ColorStateList.valueOf(colorInt);
                btn.setTextColor(csl);


                btn.setOnClickListener(new View.OnClickListener() {

                    @Override
                    public void onClick(View v) {
                        RadioButton ts = (RadioButton)  v;
                        String vs = ts.getText().toString();

                        tips.setText("this is radioButton " + vs);

                        for (int i = 0; i < rdgp.getChildCount(); i++) {
                            RadioButton tv = (RadioButton) rdgp.getChildAt(i);
                            if (v == tv) {
                                tv.setTextColor(Color.WHITE);
                                tv.setBackgroundColor(Color.parseColor("#008577"));


                            } else {
                                tv.setTextColor(Color.BLACK);
                                tv.setBackgroundColor(Color.parseColor("#FFFFFF"));
                            }
                        }
                    }
                });
                rdgp.addView(btn);
            }catch(final JSONException e){
                Toast.makeText(MainActivity.this,"errordf",Toast.LENGTH_SHORT).show();
            }
        }
    }

    public boolean onCreateOptionsMenu(Menu menu){
        getMenuInflater().inflate(R.menu.main, menu);
        return true;
    }

    public boolean onOptionsItemSelected(MenuItem item){
        switch(item.getItemId()){
            case R.id.create_db:
                Intent it = new Intent("android.intent.action.CREATEDB");
                startActivity(it);
                break;
            case R.id.insert_db:
                Intent is = new Intent("android.intent.action.INSERTDB");
                startActivity(is);
                break;
            case R.id.select_db:
                Intent ie = new Intent("android.intent.action.SELECTDB");
                startActivity(ie);
                break;
            case R.id.delete_db:
                Intent il = new Intent("android.intent.action.DELETEDB");
                startActivity(il);
                break;
            default:
        }
        return true;

    }
}
