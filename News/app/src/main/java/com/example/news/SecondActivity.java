package com.example.news;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.webkit.WebView;
import android.widget.Toast;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONException;
import org.json.JSONObject;

public class SecondActivity extends AppCompatActivity {
    private  String url ="https://shop.miido.com.cn/index/getItemDetail.action?itemId=";
    String ido = null;
    WebView ctv;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_second);
        ctv = (WebView) findViewById(R.id.content);

        Intent s = getIntent();
        ido = s.getStringExtra("idok");
        Toast.makeText(SecondActivity.this, ido, Toast.LENGTH_SHORT).show();
    }

    protected void onStart() {
        super.onStart();
        RequestQueue queue = Volley.newRequestQueue(this);
        String urls = url+ido;

        StringRequest stringRequest = new StringRequest(Request.Method.GET, urls,
                new Response.Listener<String>() {
                    @Override
                    public void onResponse(String response) {
                        try {
                            JSONObject detail = new JSONObject(response);
                            JSONObject  item = detail.getJSONObject("item");
                            String content = item.getString("content");

                            content = "<style>img{max-width: 100% !important;}</style>"+content ;

                            ctv.loadData(content, "text/html; charset=UTF-8", null);


                        } catch (final JSONException e) {

                        }
                    }
                }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {

            }


        });

        queue.add(stringRequest);
    }


}
