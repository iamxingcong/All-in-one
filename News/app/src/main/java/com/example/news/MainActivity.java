package com.example.news;

import android.content.Intent;
import android.graphics.Color;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.AdapterView;
import android.widget.FrameLayout;
import android.widget.LinearLayout;
import android.widget.ListAdapter;
import android.widget.ListView;
import android.widget.SimpleAdapter;
import android.widget.TextView;
import android.widget.Toast;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.HashMap;

public class MainActivity extends AppCompatActivity {

    private LinearLayout mContainer;

    private RequestQueue mQueue;
    private RequestQueue queue;
    private JSONArray jsar;
    private  FrameLayout frameLayout;
    private  ListView lv;
    private  String urls ="https://shop.miido.com.cn/schoolDetaile/getExperienceByMid.action?merchanId=";
    private  String url = "https://shop.miido.com.cn/schoolDetaile/getAllSchoolInfo.action";
    private  JSONArray row;

    ArrayList<HashMap<String, String>> contactList;




    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        lv =  findViewById(R.id.listview);


        lv.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {

                HashMap<String,String> map = (HashMap<String,String>)
                        lv.getItemAtPosition(position);
                String title=map.get("id");
                //Toast.makeText(MainActivity.this,title,Toast.LENGTH_LONG).show();

                if(title == "null"){
                    Toast.makeText(MainActivity.this,"数据为空",Toast.LENGTH_SHORT).show();
                    return;

                }else {
                    Intent i = new Intent(view.getContext(), SecondActivity.class);
                    i.putExtra("idok", title);
                    startActivity(i);
                }
            }
        });


        mContainer = findViewById(R.id.container);
        frameLayout=(FrameLayout)findViewById(R.id.frameLayout);

        mQueue = Volley.newRequestQueue(this);

        jsonParse();

    }

    public void addView() {

        try {
            for (int i = 0; i < jsar.length(); i++) {
                JSONObject employee = jsar.getJSONObject(i);
                String title = employee.getString("schoolname");
                String id = employee.getString("merchanid");

                TextView child = new TextView(this);
                child.setText(title);
                child.setId(Integer.parseInt(id));
                child.setPadding(25,20,25,20);
                child.setClickable(true);
                if(i == 0){
                    child.setTextColor(Color.parseColor("#FFFFFF"));
                    child.setBackgroundColor(Color.parseColor("#008577"));


                        geTtrl(id);


                };
                child.setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(View view) {
                        //Toast.makeText(MainActivity.this,String.valueOf(view.getId()),Toast.LENGTH_SHORT).show();
                        String its = String.valueOf(view.getId());
                        geTtrl(its);

                        for (int i = 0; i < mContainer.getChildCount(); i++) {
                            TextView tv = (TextView) mContainer.getChildAt(i);
                              if (view == tv) {
                                tv.setTextColor(Color.parseColor("#FFFFFF"));
                                tv.setBackgroundColor(Color.parseColor("#008577"));


                              } else {
                                tv.setTextColor(Color.GRAY);
                                tv.setBackgroundColor(Color.parseColor("#FFFFFF"));
                             }
                         };
                    }
                });

                mContainer.addView(child);
            }

        } catch (JSONException e) {
            e.printStackTrace();
        };



    }

    private void jsonParse() {

        JsonObjectRequest request = new JsonObjectRequest(Request.Method.GET, url, null,
                new Response.Listener<JSONObject>() {
                    @Override
                    public void onResponse(JSONObject response) {
                        try {
                            jsar = response.getJSONArray("datainfo");
                            addView();
                        } catch (JSONException e) {
                            e.printStackTrace();
                        }
                    }
                }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                error.printStackTrace();
            }
        });

        mQueue.add(request);
    }

    private void geTtrl(String its){
        queue = Volley.newRequestQueue(this);
        StringRequest stringRequest = new StringRequest(Request.Method.GET, urls+its,
                new Response.Listener<String>() {
                    @Override
                    public void onResponse(String response) {
                        try{
                            JSONObject uobj = new JSONObject(response);
                            JSONObject item = uobj.getJSONObject("datainfo");
                            row = item.getJSONArray("recordList");
                            JSONObject jsobj = null;



                            contactList = new ArrayList<>();
                            if(row.length() == 0){

                                HashMap<String, String> xt = new HashMap<>();

                                String title = "没有数据！！！";
                                String id =  "null";
                                xt.put("title", title);
                                xt.put("id", id);
                                contactList.add(xt);

                            }else {
                                for (int i = 0; i < row.length(); i++) {
                                    HashMap<String, String> xt = new HashMap<>();

                                    jsobj = row.getJSONObject(i);
                                    String title = jsobj.getString("title");
                                    String id = jsobj.getString("id");
                                    xt.put("title", title);
                                    xt.put("id", id);
                                    contactList.add(xt);
                                };
                            };

                            ListAdapter adapter = new SimpleAdapter (MainActivity.this,contactList,
                                    R.layout.item,new String[]{  "title","id" },
                                    new int[]{ R.id.item ,R.id.id });

                            lv.setAdapter(adapter);



                        }catch(final JSONException e){
                            Toast.makeText(MainActivity.this,"error",Toast.LENGTH_SHORT).show();
                        }


                    }
                }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                Toast.makeText(MainActivity.this,"error occured",Toast.LENGTH_SHORT).show();
            }
        });

        // Add the request to the RequestQueue.
        queue.add(stringRequest);

    }


}



